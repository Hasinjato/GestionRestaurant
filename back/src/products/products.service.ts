import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  /**
   *
   */
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) { }

  create(createProductDto: CreateProductDto): Promise<Product> {
    const prod = new Product();

    prod.nom = createProductDto.nom;
    prod.description = createProductDto.description;
    prod.prix = createProductDto.prix;
    prod.quantiteEnStock = createProductDto.quantiteEnStock;
    prod.dateAjout = new Date();
    prod.dateModif = new Date();

    const newProd = this.productRepository.create(prod);

    return this.productRepository.save(newProd);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find({ order: { dateAjout: 'DESC', dateModif: 'DESC' } });
  }

  findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  countProd(): Promise<number> {
    return this.productRepository.count();
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    updateProductDto.dateModif = new Date();
    await this.productRepository.update(id, updateProductDto);

    return this.productRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<string> {
    await this.productRepository.delete(id);

    return `This action removes a #${id} product`;
  }
}
