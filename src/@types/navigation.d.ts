import { typeDetailProps } from 'src/hooks/useHandleTypeDetails/types';
import { RouteParams } from '../screens/PlusMovies/types';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      favorites: undefined;
      actionMenu: RouteParams;
      details: { id: string; type: typeDetailProps };
      trailers: { movieId: string };
    }
  }
}
