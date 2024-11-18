import { Course, Game, Player, PlayerWithScores } from "@/mongodb/types";
import { Collection, Db, MongoClient, MongoServerError, ObjectId, Document } from "mongodb";


let clientPromise: Promise<MongoClient> | null = null;
const testUser = new ObjectId(process.env.TEST_USER)

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

async function withDatabase<T>(block: ((db: Db) => Promise<T>)): Promise<T> {
    if (clientPromise == null) {
        clientPromise = initializeClient();
    }
    const client = await clientPromise;
    const database = client.db("GolfScoreServer");
    return block(database)
}

function withCollection<CollectionT extends Document, OutputT>(
    collectionName: string,
    block: ((collection: Collection<CollectionT>) => Promise<OutputT>)): Promise<OutputT> {
    return withDatabase((db) => {
        const collection: Collection<CollectionT> = db.collection(collectionName)
        return block(collection)
    });
}

export const resolvers = {
    Player: {
        name: (player: Player) => player.name,
        id: (player: Player) => player._id
    },
    PlayerWithScores: {
        player: async (playerWithScores: PlayerWithScores): Promise<Player|null> => withCollection<Player, Player|null>("Players", (c) =>
            c.findOne({ _id: playerWithScores.id })),
        total: (playerWithScores: PlayerWithScores) => playerWithScores.scores.reduce((a: number, b: number | null) => a + (b ?? 0), 0)
    },

    Game: {
        participants: (game: Game) => game.players,
        course: async (game: Game): Promise<Course|null> => withCollection<Course, Course|null>("Courses", (c) => c.findOne({ _id: game.course })),
        description: async (game: Game) => {
            if (game.description) return game.description
            const course = await (game.course && withCollection("Courses", (c) => c.findOne({ _id: game.course })))
            const courseSegments = []
            if (course?.facility)
                courseSegments.push(course?.facility)
            if (course?.name)
                courseSegments.push(course?.name)
            const segments = []
            if (courseSegments)
                segments.push(courseSegments.join(" - "))
            if (game.date)
                segments.push(`(${game.date.toLocaleDateString(undefined, {month: "short", day: "numeric"})})`)
            return segments.join(" ")
        },
        id: (game: Game) => game._id,
    },

    Query: {
        players: async () => {
            return withDatabase(async (db) => {
                const collection = db.collection("Players");
                const allData = await collection.find({ owner: testUser }).toArray()

                return allData;
            })
        },
        games: async () => {
            return withDatabase(async (db) => {
                const collection = db.collection("Games");
                const allData = await collection.find({ owner: testUser }).toArray()

                return allData;
            })
        },
    }
}
