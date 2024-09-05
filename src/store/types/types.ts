interface Weight {
    imperial: string;
    metric: string;
}

export interface Breed {
    id?: string;
    name: string;
    description: string;
    temperament?: string;
    life_span?: string;
    origin?: string;
    alt_names?: string;
    wikipedia_url?: string;
    weight?: Weight;
    affection_level?: number;
}



export interface Cat {
    breeds: Breed[];
    id: string;
    url: string;
    liked: boolean;
}

export type Cats = Cat[];