import Constants from 'expo-constants';

export interface optionsProps {
  method: 'GET' | 'POST';
  url: string;
  data?: any;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const optionsDefault = ({ method, url, data }: optionsProps) => {
  return {
    method,
    url,
    params: {
      language: 'pt-BR',
      page: '1',
      sort_by: 'created_at.asc',
      // include_adult: false,
    },
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${Constants?.expoConfig?.extra?.access_token}`,
    },
    data,
  };
};
