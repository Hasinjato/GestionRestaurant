import { Menu } from "src/menus/entities/menu.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MenuProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Menu, (menu) => menu.menuProduits, { onDelete: 'CASCADE' })
    menu: Menu;

    @ManyToOne(() => Product, { eager: true })
    produit: Product;

    @Column()
    quantite: number;
}
