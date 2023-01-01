const capitalizeFirstLetter = (letter: string): string => {
  if (letter != null) {
    return letter.charAt(0).toUpperCase() + letter.slice(1);
  }
  return "";
};

export default capitalizeFirstLetter;
