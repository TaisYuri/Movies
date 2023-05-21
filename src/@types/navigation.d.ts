import { RouteParams } from '../screens/PlusMovies/types';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      actionMenu: RouteParams;
      details: { id: string };
      trailers: { movieId: string };
    }
  }
}
