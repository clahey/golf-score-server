import gql from "graphql-tag";


export const typeDefs = gql`
  type Player {
    name: String!
  }
  type PlayerWithScores {
    player: Player
    scores: [Int]!
  }
  type Game {
    id: String!
    description: String!
    participants: [PlayerWithScores!]!
  }

  type Query {
    players: [Player!]!
    games(id: String): [Game!]!
  }
`