import { Db, MongoClient, MongoServerError, ObjectId } from "mongodb";

var clientPromise: Promise<MongoClient> | null = null;
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

export const resolvers = {
    Player: {
        name: (parent: any) => parent.name
    },
    PlayerWithScores: {
        player: async (playerWithScores: any) => withDatabase((db) =>
            db.collection("Players").findOne({ _id: playerWithScores.id }))
    },

    Game: {
        participants: (game: any) => game.players,
        id: (game: any) => game._id,
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
