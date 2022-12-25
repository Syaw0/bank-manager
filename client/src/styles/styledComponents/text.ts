import { styled } from "../@stitches.config";

const Text = styled("p", {
  fontFamily: "$Barlow",
  color: "$onBg",
  cursor: "default",
  display: "flex",
  jc_ac: "",
  variants: {
    cursor: {
      click: {
        cursor: "pointer",
      },
    },
    italic: {
      true: {
        fontStyle: "italic",
      },
    },
    size: {
      h1: {
        fontSize: "$headline1",
      },
      h2: {
        fontSize: "$headline2",
      },
      h3: {
        fontSize: "$headline3",
      },
      h4: {
        fontSize: "$headline4",
      },
      h5: {
        fontSize: "$headline5",
      },
      h6: {
        fontSize: "$headline6",
      },
      sHead1: {
        fontSize: "$subhead1",
      },

      sHead2: {
        fontSize: "$subhead2",
      },
      sHead3: {
        fontSize: "$subhead3",
      },
      button: {
        fontSize: "$button",
      },
    },
    weight: {
      100: {
        fontWeight: "100",
      },
      200: {
        fontWeight: "200",
      },
      300: {
        fontWeight: "300",
      },
      400: {
        fontWeight: "400",
      },
      500: {
        fontWeight: "500",
      },
      600: {
        fontWeight: "600",
      },
      700: {
        fontWeight: "700",
      },
      800: {
        fontWeight: "800",
      },
      900: {
        fontWeight: "900",
      },
    },
  },
});

export default Text;
