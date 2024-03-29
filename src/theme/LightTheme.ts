import { ITheme } from 'src/@types/styled';

const LightTheme: ITheme = {
  colors: {
    base: '#1c1c1c',
    base_alternative: '#fff',
    subtitle: '#383838',
    primary: '#FF7A00',
    primary_translucid: '#FF7A003b',
    background: '#F0F3FF',
    grays: {
      grayscale_100: 'rgba(0,0,0,0.1)',
      grayscale_200: '#f9fbff30',
      grayscale_300: '#F0F3FF',
    },
  },
  fonts: {
    regular: 'OpenSans_400Regular',
    medium: 'OpenSans_500Medium',
    bold: 'OpenSans_700Bold',
  },
};

export default LightTheme;
