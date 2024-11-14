"use client"

import { gql } from "@/graphql";
import { useQuery } from "@apollo/client";
import { Card, CardContent, CardHeader, Container, Stack, Typography } from "@mui/material";

export default function GameList() {
    const QUERY = gql(`
      query GetGames {
        games {
          id
          description
          participants {
            player { name }
            total
          }
        }
      }
    `);

    const { loading, error, data } = useQuery(QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <Container>
            <Stack>
                <Typography variant="h4">Games</Typography>
                {data?.games?.map(({ id, description, participants }) => (
                    <Card key="{id}">
                        <CardHeader title={description}></CardHeader>
                        <CardContent>
                            <ul>
                                {participants.map(p => (
                                    <li key="{p.player.id}">{p.player?.name} - {p.total}</li>
                                ))}
                            </ul>
                            </CardContent>
                    </Card>)
                )}
            </Stack>
        </Container>
    )
}

