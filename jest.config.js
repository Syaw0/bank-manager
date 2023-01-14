export default {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.css$": "jest-transform-css",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "jsdom",
};
