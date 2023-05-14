import { IProviderSchema } from 'src/hooks/useProvider/types';

export interface IBasicInformation {
  runtime?: string;
  title?: string;
  voteAverage?: string;
  releaseDate?: string;
  genres?: IGenres[];
  overview?: string;
  provider?: IProviderSchema[];
  logoPath?: string;
}

export interface IGenres {
  id: string;
  name: string;
}
