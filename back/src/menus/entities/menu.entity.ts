import { MenuProduct } from "src/menu-products/entities/menu-product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prix: number;

    @OneToMany(() => MenuProduct, (menuProduct) => menuProduct.menu, { cascade: true })
    menuProduits: MenuProduct[];

    @Column()
    dateAjout: Date;

    @Column()
    dateModif: Date;
}
