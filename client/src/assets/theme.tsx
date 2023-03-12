import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme(
  {
    components: {
      Button: {
        baseStyle: {
          border: "1px solid",
        },
      },
    },
    styles: {
      global: (props: any) => ({
        "html, body": {
          background:
            props.colorMode === "dark"
              ? `linear-gradient(180deg, #000000 0%, #1E1E1E 100%)`
              : `linear-gradient(180deg, #FFFFFF 50%, #1E1E1E 200%)`,
          boxStyle: "border-box",
        },
      }),
    },
    colors: {
      bg_dark: {
        500: "#202124",
      },
      txt_dark: {
        300: "#ffd993",
        400: "#e9c685",
        500: "#CCAE76",
      },
      out_dark: {
        500: "white",
      },
      bg_light: {
        500: "white",
      },
      txt_light: {
        300: "#525660",
        400: "#36383e",
        500: "#202124",
      },
      out_light: {
        500: "black",
      },
    },
    sizes: {
      full: "100%",
      "3xs": "14rem",
      "2xs": "16rem",
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
    },
  },
  { config }
);
