import { Product } from "src/products/entities/product.entity";

export class CreateMenuDto {
    nom: string;
    produitsQuantites: { produitId: number, quantite: number }[];
}
