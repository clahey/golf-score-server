/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Game = {
  __typename?: 'Game';
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  participants: Array<PlayerWithScores>;
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type PlayerWithScores = {
  __typename?: 'PlayerWithScores';
  player?: Maybe<Player>;
  scores: Array<Maybe<Scalars['Int']['output']>>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  games: Array<Game>;
  players: Array<Player>;
};


export type QueryGamesArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type GetGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGamesQuery = { __typename?: 'Query', games: Array<{ __typename?: 'Game', id: string, description: string, participants: Array<{ __typename?: 'PlayerWithScores', total: number, player?: { __typename?: 'Player', name: string } | null }> }> };


export const GetGamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGames"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"games"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<GetGamesQuery, GetGamesQueryVariables>;