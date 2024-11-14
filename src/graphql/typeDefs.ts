import gql from "graphql-tag";


export const typeDefs = gql`
  type Course {
    facility: String
    name: String
  }
  type Player {
    id: String!
    name: String!
  }
  type PlayerWithScores {
    player: Player
    total: Int!
    scores: [Int]!
  }
  type Game {
    id: String!
    description: String
    course: Course
    participants: [PlayerWithScores!]!
  }

  type Query {
    players: [Player!]!
    games(id: String): [Game!]!
  }
`