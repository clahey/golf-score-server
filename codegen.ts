
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/typeDefs.ts",
  documents: "src/**/*.tsx",
  generates: {
    "src/graphql/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql"
      },
      plugins: []
    }
  }
};

export default config;
