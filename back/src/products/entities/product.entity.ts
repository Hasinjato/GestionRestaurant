import { Column, Double, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    description: string;

    @Column()
    prix: number;

    @Column()
    quantiteEnStock: number;

    @Column()
    dateAjout: Date;

    @Column()
    dateModif: Date;
}
