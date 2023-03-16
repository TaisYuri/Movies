import { RouteParams } from "../screens/PlusMovies/types";
import { IMovies } from "../screens/Home/types";

export declare global{
    namespace ReactNavigation{
      interface RootParamList{
        home: undefined;
        actionMenu: RouteParams;
        details: { id: string;}
      }
    }
  }