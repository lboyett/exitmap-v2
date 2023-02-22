import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        background: `linear-gradient(180deg, #000000 0%, #1E1E1E 100%)`,
        boxStyle: "border-box",
      },
    },
  },
  colors: {
    bg: {
      500: "#202124",
    },
    txt: {
      500: "#CCAE76",
    },
  },
});
