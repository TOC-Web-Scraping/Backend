interface Ability {
    name: string;
    imageUrl: string;
    type: string;
    topDescription: string[];
    bottomDescription:string;
    cost: string;
}

export default interface Agent {
    name: string;
    imageUrl: string;
    country: string;
    role: string;
    releaseDate: string;
    abilities: Ability[];
}