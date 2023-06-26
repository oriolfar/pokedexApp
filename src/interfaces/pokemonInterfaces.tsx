export interface PokemonPaginatedResponse {
    count: number;
    next: string;
    previous: null;
    results: Result[];
}

export interface Result {
    name: string;
    url: string;
}

export interface SimplePokemon {
    name: string;
    image: string;
    id: string;
    color?: string;
}
