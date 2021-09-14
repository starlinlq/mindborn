import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    main: string;
    background: string;
    primaryFont: string;
    letterSpacing: string;
    titleFont: string;
    secondary: string;
  }
}
