import { ObjectId } from "mongodb";

export interface GeoJSON {
    type: string
    coordinates: number[]
}

export interface Course {
    _id: ObjectId;
    name: string;
    facility: string;
    location: GeoJSON;
}

export interface PlayerWithScores {
    id: ObjectId;
    scores: (number|null)[]
}

export interface Game {
    _id: ObjectId;
    owner: ObjectId;
    players: PlayerWithScores[];
    version: number;
    course: ObjectId|undefined;
    description: string|undefined;
    date: Date
}

export interface Player {
    _id: ObjectId;
    owner: ObjectId;
    name: string;
}

export interface User {
    _id: ObjectId;
    email: string;
    name: string;
}
