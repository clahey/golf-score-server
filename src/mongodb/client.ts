import { MongoClient, MongoServerError, Db, Collection, ObjectId, Document, Filter } from "mongodb";
import { Course, Game, Player } from "./types";

let clientPromise: Promise<MongoClient> | null = null;

function initializeClient(): Promise<MongoClient> {
    return new Promise(async (resolve, reject) => {
        try {
            const client = new MongoClient(process.env.MONGODB_URI!);
            await client.connect();
            resolve(client);
        } catch (error) {
            if (error instanceof MongoServerError) {
                console.log(`Error worth logging: ${error}`); // special case for some reason
            }
            reject(error)
        }
    })
}

export async function withDatabase<T>(block: ((db: Db) => Promise<T>)): Promise<T> {
    if (clientPromise == null) {
        clientPromise = initializeClient();
    }
    const client = await clientPromise;
    const database = client.db("GolfScoreServer");
    return block(database)
}

export function withCollection<T>(collectionName: string, block: ((collection: Collection<Document>) => Promise<T>)): Promise<T>;
export function withCollection<T>(collectionName: "Courses", block: ((collection: Collection<Course>) => Promise<T>)): Promise<T>;
export function withCollection<T>(collectionName: "Players", block: ((collection: Collection<Player>) => Promise<T>)): Promise<T>;
export function withCollection<CollectionT extends Document, OutputT>(
    collectionName: string,
    block: ((collection: Collection<CollectionT>) => Promise<OutputT>)): Promise<OutputT> {
    return withDatabase((db) => {
        const collection: Collection<CollectionT> = db.collection(collectionName)
        return block(collection)
    });
}
export function findById(collectionName: "Courses", id: ObjectId | undefined): Promise<Course | null>;
export function findById(collectionName: "Players", id: ObjectId | undefined): Promise<Player | null>;
export function findById(collectionName: "Games", id: ObjectId | undefined): Promise<Game | null>;
export function findById<T extends (Document & { _id: ObjectId })>(collectionName: string, id: ObjectId | undefined): Promise<T | null> {
    return withDatabase(async (db) => {
        const collection: Collection<T> = db.collection(collectionName)
        const result = await collection.findOne({ _id: id } as Filter<T>)
        return result as (T | null)
    });
}
export function findByOwner(collectionName: "Courses", owner: ObjectId | undefined): Promise<Course[]>;
export function findByOwner(collectionName: "Players", owner: ObjectId | undefined): Promise<Player[]>;
export function findByOwner(collectionName: "Games", owner: ObjectId | undefined): Promise<Game[]>;
export function findByOwner<T extends (Document & { owner: ObjectId })>(collectionName: string, owner: ObjectId | undefined): Promise<T[]> {
    return withDatabase(async (db) => {
        const collection: Collection<T> = db.collection(collectionName)
        const result = await collection.find({ owner: owner } as Filter<T>).toArray()
        return result as T[]
    });
}