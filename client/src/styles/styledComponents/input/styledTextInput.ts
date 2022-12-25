import { styled } from "../../@stitches.config";

export default styled("input", {
  border: "2px solid $onBg",
  padding: "$1 $1",
  borderRadius: "8px",
  margin: "$1 0",
  fontSize: "$subhead2",
  fontWeight: "600",
  color: "$onBg900",
  "&:focus": {
    outline: "2px solid $onBg",
    outlineOffset: "1px",
    backgroundColor: "$onPrimary100",
  },
  variants: {},
});
