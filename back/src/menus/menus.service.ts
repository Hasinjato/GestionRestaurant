import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { DataSource, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { MenuProduct } from 'src/menu-products/entities/menu-product.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MenusService {

  /**
   *
   */
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,

    @InjectRepository(Product)
    private readonly prodRepository: Repository<Product>
  ) { }

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const menu = new Menu();

    menu.nom = createMenuDto.nom;
    menu.prix = 0;
    menu.menuProduits = [];
    menu.dateAjout = new Date();
    menu.dateModif = new Date();

    let prixMenu: number;

    for (const pq of createMenuDto.produitsQuantites) {
      const produit = await this.prodRepository.findOne({ where: { id: pq.produitId } });

      menu.prix += (produit.prix * pq.quantite);

      if (!produit) {
        throw new BadRequestException(`Produit ID ${pq.produitId} non trouvé.`);
      }

      if (produit.quantiteEnStock < pq.quantite) {
        throw new BadRequestException(
          `Stock insuffisant pour le produit ${produit.nom}. Disponible: ${produit.quantiteEnStock}, Requis: ${pq.quantite}`
        );
      }

      const menuProduit = new MenuProduct();

      menuProduit.quantite = pq.quantite;
      menuProduit.produit = produit;
      menuProduit.menu = menu;

      menu.menuProduits.push(menuProduit);

      if (!menu) {    // SUpprimer la réference circulaire
        return null;
      }
      menu.menuProduits.forEach((menuProduit) => { delete menuProduit.menu });

    }

    return this.menuRepository.save(menu);
  }

  async acheter(menuId: number): Promise<any> {
    const menu = await this.menuRepository.findOne({ where: { id: menuId }, relations: ['menuProduits'] });

    if (!menu) {
      throw new NotFoundException('Menu non disponible');
    }

    for (const qp of menu.menuProduits) {
      if (qp.quantite > qp.produit.quantiteEnStock) {
        throw new BadRequestException(`Stock de produit '${qp.produit.nom}' insuffisant pour cette menu '${menu.nom}'. Disponible: ${qp.produit.quantiteEnStock}. Requis: ${qp.quantite}`);
      }

      await this.prodRepository.update(qp.produit.id, { quantiteEnStock: (qp.produit.quantiteEnStock - qp.quantite) });
    }

    return {
      "message": `${menu.nom} acheté avec succèss`,
      "menu": menu
    }

  }

  findAll(): Promise<Menu[]> {
    return this.menuRepository.find({ relations: ['menuProduits'], order: { dateAjout: 'DESC', dateModif: 'DESC' } });
  }

  findOne(id: number): Promise<Menu | null> {
    return this.menuRepository.findOne({ where: { id }, relations: { menuProduits: true } });
  }

  countMenus(): Promise<number> {
    return this.menuRepository.count();
  }

  // findProductMenuByMenu(id: number): Promise<Menu | null> {
  //   return this.menuRepository.findOne({})
  // }

  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    updateMenuDto.dateModif = new Date();
    await this.menuRepository.update(id, updateMenuDto);

    return this.menuRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<string> {
    await this.menuRepository.delete(id);

    return `This action removes a #${id} menu`;
  }
}
