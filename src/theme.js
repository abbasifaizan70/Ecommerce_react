import { createTheme } from "@material-ui/core";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto"].join(","),
    h1: {
      fontFamily: ["Roboto"].join(","),
      fontSize: "150px",
    },
    h2: {
      fontFamily: ["Roboto"].join(","),
      fontSize: "100px",
    },
    h3: {
      fontFamily: ["Roboto"].join(","),
      fontSize: "56px",
    },
    h4: {
      fontFamily: ["Roboto"].join(","),
      fontSize: "32px",
    },
    h5: {
      fontSize: "28px",
      letterSpacing: 4.75,
    },
    h6: {
      fontSize: "28px",
      fontFamily: ["Roboto"].join(","),
    },
    body1: {
      letterSpacing: 2.5,
      lineHeight: 1.65,
    },
    body2: {
      letterSpacing: 1.5,
      fontSize: "16px",
    },
    subtitle1: {
      fontSize: "14px",
      letterSpacing: 2.35,
    },
    subtitle2: {
      fontSize: "16px",
      letterSpacing: 2.7,
    },
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1124,
      xl: 1440,
    },
  },
});

export default theme;
