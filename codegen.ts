import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/types',

  generates: {
    './__generated/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        contextType: '../src/main#ContextValue',
      },
    },
  },

  // debug: true,
  // verbose: true,
};

export default config;
