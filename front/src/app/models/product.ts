export class Product {
    id!: number;
    nom!: string;
    description!: string;
    prix!: number;
    quantiteEnStock!: number;
    dateAjout!: Date;
    dateModif!: Date;
}

export interface ProductDto {
    nom: string;
    description: string;
    prix: number;
    quantiteEnStock: number;
}

export interface ProductAPI {
    id: number;
    nom: string;
    description: string;
    prix: number;
    quantiteEnStock: number;
    dateAjout: Date;
    dateModif: Date;
}