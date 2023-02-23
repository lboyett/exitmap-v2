import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme(
  {
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
  },
  { config }
);
