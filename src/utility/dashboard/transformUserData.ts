import { allAccessibilityInObj } from "../../sharedData/allAccessibility";

const transformUserData = (data: any) => {
  const newObj = { ...data };
  newObj["accessibility"] = [];
  Object.keys(data).forEach((acc) => {
    if (acc in allAccessibilityInObj) {
      if (data[acc] != 0) {
        newObj.accessibility.push(acc);
      }
      delete newObj[acc];
    }
  });
  return newObj;
};

export const transformAccessibilityToChange = (data: any) => {
  const newObj: any = {};
  Object.keys(data).forEach((d) => {
    if (data[d]) {
      newObj[d] = "";
    }
  });
  return newObj;
};

export default transformUserData;
