export interface IBasicInformation {
  runtime: string;
  title: string;
  vote_average: string;
  release_date: string;
  genres: IGenres[];
  overview: string;
  provider: IProvider[];
  logo_path: string;
}

interface IGenres {
  id: string;
  name: string;
}

interface IProvider {
  provider_id: string;
  logo_path: string;
}
