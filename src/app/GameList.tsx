import { gql } from "@/graphql";
import { useQuery } from "@apollo/client";
import { Console } from "console";

export function GameList() {
    const QUERY = gql(`
      query GetGames {
        games {
          id
          description
          participants { player { name }}
        }
      }
    `);

    const { loading, error, data } = useQuery(QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <div>
            <h1> Games! </h1>
            {data?.games?.map(({ id, description, participants }) => (
                <div key="{id}">
                    <h1>{description}</h1>
                    <ul>
                        {participants.map(p => (
                            <li key="{p.player.id}">{p.player?.name}</li>
                        ))}
                    </ul>
                </div>)
            )}
        </div>
    )
}

