import { typeDetailProps } from 'src/hooks/useHandleTypeDetails/types';
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
  type: typeDetailProps;
}

export interface IGenres {
  id: string;
  name: string;
}
