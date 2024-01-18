import url from 'url';
import { getGlobals } from 'common-es';

import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';

const { __dirname } = getGlobals(import.meta.url);

const loadedTypeDefs = await loadFiles(`${__dirname}/**/*.types.*`, {
  ignoreIndex: true,
  requireMethod: async (path: string) => {
    // @ts-ignore
    return await import(url.pathToFileURL(path));
  },
});

export default mergeTypeDefs(loadedTypeDefs);
