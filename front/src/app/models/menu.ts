import { ProductAPI } from "./product";

export class Menu {
    id!: number;
    nom!: string;
    prix!: number;
    dateAjout!: Date;
    dateModif!: Date;
    menuProduits!: MenuProduct[];
}

export interface MenuProduct {
    id: number;
    quantite: number;
    produit: ProductAPI;
}

export interface MenuDto {
    nom: string;
    produitsQuantites: [
        { produitId: number, quantite: number }
    ]
}

export interface MenuAPI {
    id: number;
    nom: string;
    prix: number;
    dateAjout: Date;
    dateModif: Date;
    menuProduits: MenuProduct[];
}