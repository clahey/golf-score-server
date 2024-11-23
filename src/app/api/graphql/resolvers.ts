import { findById, findByOwner } from "@/mongodb/client";
import { Course, Game, Player, PlayerWithScores } from "@/mongodb/types";
import { ObjectId } from "mongodb";

export const resolvers = {
    Player: {
        id: (player: Player) => player._id
    },
    PlayerWithScores: {
        player: (playerWithScores: PlayerWithScores): Promise<Player | null> => findById("Players", playerWithScores.id),
        total: (playerWithScores: PlayerWithScores) => playerWithScores.scores.reduce((a: number, b: number | null) => a + (b ?? 0), 0)
    },

    Game: {
        participants: (game: Game) => game.players,
        course: (game: Game): Promise<Course | null> => findById("Courses", game.course),
        description: async (game: Game) => {
            if (game.description) return game.description
            const course = await (game.course && findById("Courses", game.course))
            const courseSegments = []
            if (course?.facility)
                courseSegments.push(course?.facility)
            if (course?.name)
                courseSegments.push(course?.name)
            const segments = []
            if (courseSegments)
                segments.push(courseSegments.join(" - "))
            if (game.date)
                segments.push(`(${game.date.toLocaleDateString(undefined, { month: "short", day: "numeric" })})`)
            return segments.join(" ")
        },
        id: (game: Game) => game._id,
    },

    Query: {
        players: async (_parent: unknown, _args: unknown, context: { userId: string | null }): Promise<Player[]> => {
            if (context.userId) {
                return await findByOwner("Players", new ObjectId(context.userId))
            } else {
                return []
            }
        },
        games: async(_parent: unknown, _args: unknown, context: { userId: string | null }): Promise<Game[]> => {
            if (context.userId) {
                return await findByOwner("Games", new ObjectId(context.userId))
            } else {
                return []
            }
        }
    }
}
