/* eslint-disable import/prefer-default-export */
import { keyframes } from "./@stitches.config";
const flip = keyframes({
  "50%": {
    transform: "rotateY(180deg)",
  },
  "100%": {
    transform: "rotateY(180deg) rotateX(180deg)",
  },
});

export { flip };
