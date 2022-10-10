import { IMovies } from "../screens/Home/types";

export declare global{
    namespace ReactNavigation{
      interface RootParamList{
        home: undefined;
        actionMenu: { title: string; films: IMovies[]};
        details: { id: string;}
      }
    }
  }