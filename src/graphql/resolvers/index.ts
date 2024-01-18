import url from 'url';
import { getGlobals } from 'common-es';

import { mergeResolvers } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';

const { __dirname } = getGlobals(import.meta.url);

const loadedResolvers = await loadFiles(`${__dirname}/**/*.resolvers.*`, {
  ignoreIndex: true,
  requireMethod: async (path: string) => {
    // @ts-ignore
    return await import(url.pathToFileURL(path));
  },
});

export default mergeResolvers(loadedResolvers);
