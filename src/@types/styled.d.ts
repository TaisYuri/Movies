import 'styled-components';

import type Theme from '../theme/Theme';

export type ITheme = typeof Theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
