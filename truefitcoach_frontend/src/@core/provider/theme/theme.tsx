import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ffedd1",
      main: "#FF7F50",
      dark: "#1A1A1A",
    },
    secondary: {
      light: "#bababa",
      main: "#ffb69c",
      dark: "#282828",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480, //Mobile devices (Portrait)
      md: 768, //Mobile devices (Landscape)
      lg: 1024, //Tablet devices
      xl: 1440, //Small desktop devices (Base) - Large desktop devices > 1440px
    },
  },
  typography: {
    fontFamily: "system-ui",
  },
});

export default theme;
