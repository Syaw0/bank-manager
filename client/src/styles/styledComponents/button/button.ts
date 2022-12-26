import { styled } from "../../@stitches.config";

const StyledButton = styled("button", {
  border: "none",
  cursor: "pointer",
  backgroundColor: "transparent",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "2px 0",
  margin: "$1 0 ",

  "&:focus": {
    outline: "none",
  },
  "&:hover": {},
  subhead1: "600",
  color: "$onBg700",
  "& svg": {
    marginRight: "10px",
  },
  "&:disabled": {
    backgroundColor: "$gray400",
    cursor: "wait",
    color: "$onBg600",
    "&:hover": {
      color: "$onBg600",
      backgroundColor: "$gray400",
      "& svg": {
        fill: "$onBg600",
      },
    },
    "& svg": {
      fill: "$onBg600",
    },
  },
  variants: {
    type: {
      shadow: {
        color: "$onBg",
        backgroundColor: "transparent",
        border: "none",
      },
      outline: {
        "& svg": {
          fill: "$primary",
        },
        borderRadius: "32px",
        color: "$primary",
        border: "1px solid $primary",
        "&:hover": {
          color: "$onPrimary",
          backgroundColor: "$primary",
          "& svg": {
            fill: "$onPrimary",
          },
        },
      },
      primary: {
        backgroundColor: "$primary",
        "& svg": {
          fill: "$onPrimary",
        },
        borderRadius: "8px",
        color: "$onPrimary",
        border: "1px solid $onPrimary",
        "&:hover": {
          color: "$primary",
          backgroundColor: "$onPrimary",
          "& svg": {
            fill: "$primary",
          },
        },
      },
    },
    color: {
      error: {
        backgroundColor: "$error",
        color: "$onError",
      },
      success: {
        backgroundColor: "$success",
        color: "$onSuccess",
      },
    },
  },
  compoundVariants: [
    {
      color: "error",
      type: "primary",
      css: {
        border: "none",
        "&:hover": {
          backgroundColor: "$onError",
          color: "$error",
          border: "none",
        },
      },
    },
    {
      color: "success",
      type: "primary",
      css: {
        border: "none",
        "&:hover": {
          backgroundColor: "$onSuccess",
          color: "$success",
          border: "none",
        },
      },
    },
  ],
});

export default StyledButton;
