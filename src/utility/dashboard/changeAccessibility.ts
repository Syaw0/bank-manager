import useFetch from "../hook/useFetch";
import { transformAccessibilityToChange } from "./transformUserData";

const changeAccessibility = async (
  changedAccess: any,
  data: any,
  type: string
): Promise<any> => {
  console.log(changedAccess, data, type);
  try {
    const result: any = useFetch(`/changeAccess/${type}/${data.id}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformAccessibilityToChange(changedAccess)),
    });
    console.log(result);
    return result;
  } catch (err) {
    return {
      status: false,
      msg: "error during send request!",
    };
  }
};

export default changeAccessibility;
