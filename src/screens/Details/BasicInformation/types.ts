import { IProviderSchema } from "src/hooks/useProvider/types";

export interface IBasicInformation {
  runtime: string;
  title: string;
  vote_average: string;
  release_date: string;
  genres: IGenres[];
  overview: string;
  provider: IProviderSchema[];
  logo_path: string;
}

export interface IGenres {
  id: string;
  name: string;
}

interface IProvider {
  provider_id: string;
  logo_path: string;
}
