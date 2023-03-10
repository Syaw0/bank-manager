import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  keyframes,
  createTheme,
  globalCss,
  getCssText,
  theme,
  config,
} = createStitches({
  theme: {
    colors: {
      bg: "rgba(254, 251, 255 ,1)",
      bg100: "rgba(254, 251, 255 ,0.1)",
      bg200: "rgba(254, 251, 255 ,0.2)",
      bg300: "rgba(254, 251, 255 ,0.3)",
      bg400: "rgba(254, 251, 255 ,0.4)",
      bg500: "rgba(254, 251, 255 ,0.5)",
      bg600: "rgba(254, 251, 255,0.6)",
      bg700: "rgba(254, 251, 255,0.7)",
      bg800: "rgba(254, 251, 255,0.8)",
      bg900: "rgba(254, 251, 255 ,0.9)",

      onBg: "rgba(27, 27, 31 ,1)",
      onBg100: "rgba(27, 27, 31 ,0.1)",
      onBg200: "rgba(27, 27, 31 ,0.2)",
      onBg300: "rgba(27, 27, 31 ,0.3)",
      onBg400: "rgba(27, 27, 31 ,0.4)",
      onBg500: "rgba(27, 27, 31 ,0.5)",
      onBg600: "rgba(27, 27, 31 ,0.6)",
      onBg700: "rgba(27, 27, 31 ,0.7)",
      onBg800: "rgba(27, 27, 31 ,0.8)",
      onBg900: "rgba(27, 27, 31 ,0.9)",

      primary: "rgba(216, 226, 255,1)",
      primary100: "rgba(216, 226, 255,0.1)",
      primary200: "rgba(216, 226, 255,0.2)",
      primary300: "rgba(216, 226, 255,0.3)",
      primary400: "rgba(216, 226, 255,0.4)",
      primary500: "rgba(216, 226, 255,0.5)",
      primary600: "rgba(216, 226, 255,0.6)",
      primary700: "rgba(216, 226, 255,0.7)",
      primary800: "rgba(216, 226, 255,0.8)",
      primary900: "rgba(216, 226, 255,0.9)",

      onPrimary: "rgba(0, 26, 65,1)",
      onPrimary100: "rgba(0, 26, 65,0.1)",
      onPrimary200: "rgba(0, 26, 65,0.2)",
      onPrimary300: "rgba(0, 26, 65,0.3)",
      onPrimary400: "rgba(0, 26, 65,0.4)",
      onPrimary500: "rgba(0, 26, 65,0.5)",
      onPrimary600: "rgba(0, 26, 65,0.6)",
      onPrimary700: "rgba(0, 26, 65,0.7)",
      onPrimary800: "rgba(0, 26, 65,0.8)",
      onPrimary900: "rgba(0, 26, 65,0.9)",

      secondary: "rgba(218,230,217,1)",
      secondary100: "rgba(218,230,217,0.1)",
      secondary200: "rgba(218,230,217,0.2)",
      secondary300: "rgba(218,230,217,0.3)",
      secondary400: "rgba(218,230,217,0.4)",
      secondary500: "rgba(218,230,217,0.5)",
      secondary600: "rgba(218,230,217,0.6)",
      secondary700: "rgba(218,230,217,0.7)",
      secondary800: "rgba(218,230,217,0.8)",
      secondary900: "rgba(218,230,217,0.9)",

      onSecondary: "rgba(20,30,22,1)",
      onSecondary100: "rgba(20,30,22,0.1)",
      onSecondary200: "rgba(20,30,22,0.2)",
      onSecondary300: "rgba(20,30,22,0.3)",
      onSecondary400: "rgba(20,30,22,0.4)",
      onSecondary500: "rgba(20,30,22,0.5)",
      onSecondary600: "rgba(20,30,22,0.6)",
      onSecondary700: "rgba(20,30,22,0.7)",
      onSecondary800: "rgba(20,30,22,0.8)",
      onSecondary900: "rgba(20,30,22,0.9)",

      error: "rgba(241, 202, 202,1)",
      error300: "rgba(241, 202, 202,0.3)",
      onError: "rgba(77, 9, 9,1)",
      onError300: "rgba(77, 9, 9,0.3)",
      success: "rgba(202, 241, 225,1)",
      onSuccess: "rgba(14, 77, 9,1)",
      warn: "rgba(241, 228, 202,1)",
      onWarn: "rgba(77, 54, 9,1)",
      gray: "rgba(50,50,50,1)",
      gray100: "rgba(50,50,50,0.1)",
      gray400: "rgba(50,50,50,0.4)",
    },

    shadows: {
      "1dp":
        "0px 0px 2px 0px #00000024 , 0px 2px 2px 0px #0000001f , 0px 1px 3px 0px  #00000033",
      "8dp":
        "0px 8px 10px 1px #00000024 , 0px 3px 14px 3px #0000001f , 0px 4px 15px 0px  #00000033",
      "1dpw":
        "0px 0px 2px 0px #ffffff24 , 0px 2px 2px 0px #ffffff1f , 0px 1px 3px 0px  #ffffff33",
      "24dp":
        "0px 24px 38px 3px #00000024 , 0px 9px 46px 8px #0000001f , 0px 11px 15px 0px  #00000033",
    },

    fonts: {
      Barlow: "Barlow",
    },
    fontSizes: {
      headline1: "60px",
      headline2: "50px",
      headline3: "43px",
      headline4: "24px",
      headline5: "22px",
      headline6: "18px",
      subhead1: "16px",
      subhead2: "14px",
      subhead3: "12px",
      button: "15px",
    },

    lineHeights: {
      headline1: "75px",
      headline2: "60px",
      headline3: "53px",
      headline4: "32px",
      headline5: "28px",
      headline6: "24px",
      subhead1: "24px",
      subhead2: "20px",
      subhead3: "18px",
      button: "20px",
    },

    space: {
      1: "8px",
      2: "16px",
      3: "24px",
      4: "32px",
      5: "40px",
      6: "48px",
      7: "56px",
      8: "64px",
      9: "72px",
      10: "80px",
      11: "88px",
      12: "96px",
      13: "102px",
      14: "110px",
      15: "120px",
    },
    transitions: {
      coAndBg: "color 0.5s , background-color 0.5s , fill 0.5s",
      shadowing: "box-shadow 0.5s",
    },
  },

  media: {
    bp0: "(max-width:1200px)",
    bp1: "(max-width:1000px)",
    bp2: "(max-width:850px)",
    bp3: "(max-width:750px)",
    bp3_1: "(max-width:600px)",
    bp4: "(max-width:540px)",
    bp5: "(max-width:420px)",
  },

  utils: {
    headline1: (weight: string) => ({
      fontFamily: "$Barlow",
      fontWeight: weight,
      fontSize: "$headline1",
      lineHeight: "$headline1",
      fontStyle: "normal",
    }),

    headline1_i: (weight: string) => ({
      headline1: weight,
      fontStyle: "italic",
    }),

    headline2: (weight: string) => ({
      fontFamily: "$Barlow",
      fontWeight: weight,
      fontSize: "$headline2",
      lineHeight: "$headline2",
      fontStyle: "normal",
    }),

    headline2_i: (weight: string) => ({
      headline2: weight,
      fontStyle: "italic",
    }),

    headline3: (weight: string) => ({
      fontFamily: "$Barlow",
      fontWeight: weight,
      fontSize: "$headline3",
      lineHeight: "$headline3",
      fontStyle: "normal",
    }),

    headline3_i: (weight: string) => ({
      headline3: weight,
      fontStyle: "italic",
    }),

    headline4: (weight: string) => ({
      fontFamily: "$Barlow",
      fontWeight: weight,
      fontSize: "$headline4",
      lineHeight: "$headline4",
      fontStyle: "normal",
    }),

    headline4_i: (weight: string) => ({
      headline4: weight,
      fontStyle: "italic",
    }),

    headline5: (weight: string) => ({
      fontFamily: "$Barlow",
      fontWeight: weight,
      fontSize: "$headline5",
      lineHeight: "$headline5",
      fontStyle: "normal",
    }),

    headline5_i: (weight: string) => ({
      headline5: weight,
      fontStyle: "italic",
    }),

    headline6: (weight: string) => ({
      fontFamily: "$Barlow",
      fontWeight: weight,
      fontSize: "$headline6",
      lineHeight: "$headline6",
      fontStyle: "normal",
    }),

    headline6_i: (weight: string) => ({
      headline6: weight,
      fontStyle: "italic",
    }),

    subhead1: (weight: string) => ({
      fontFamily: "$Barlow",
      fontWeight: weight,
      fontSize: "$subhead1",
      lineHeight: "$subhead1",
      fontStyle: "normal",
      letterSpacing: "$1",
    }),

    subhead2: (weight: string) => ({
      fontFamily: "$Barlow",
      fontWeight: weight,
      fontSize: "$subhead2",
      lineHeight: "$subhead2",
      fontStyle: "normal",
      letterSpacing: "$1",
    }),
    subhead2_i: (weight: string) => ({
      subhead2: weight,
      fontStyle: "italic",
    }),

    subhead3: (weight: string) => ({
      fontFamily: "$Barlow",
      fontWeight: weight,
      fontSize: "$subhead3",
      lineHeight: "$subhead3",
      fontStyle: "normal",
      letterSpacing: "$1",
    }),

    subhead3_i: (weight: string) => ({
      subhead3: weight,
      fontStyle: "italic",
    }),

    button: (weight: string) => ({
      fontFamily: "$Barlow",
      fontWeight: weight,
      fontSize: "$button",
      lineHeight: "$button",
      fontStyle: "normal",
      letterSpacing: "$1",
    }),

    flex_r: () => ({
      display: "flex",
      flexDirection: "row",
    }),

    flex_c: () => ({
      display: "flex",
      flexDirection: "column",
    }),

    jc_ac: () => ({
      "justify-content": "center",
      "align-items": "center",
    }),

    jfs_afs: () => ({
      "justify-content": "flex-start",
      "align-items": "flex-start",
    }),
    jfs_ac: () => ({
      "justify-content": "flex-start",
      "align-items": "center",
    }),
    jsb_ac: () => ({
      "justify-content": "space-between",
      "align-items": "center",
    }),
  },
});
