import { IMovies } from "../../screens/Home/types";



export interface IListCards {
    title: string;
    dataMovies: IMovies[]
    newMovies?: boolean;  
    textLink?: string;
  }