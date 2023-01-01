import useFetch from "../hook/useFetch";
import transformUserData from "./transformUserData";

const whoami = async (): Promise<any> => {
  try {
    const result: any = await useFetch(`/whoami`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    result.data = transformUserData(result.data[0]);
    return result;
  } catch (err) {
    return {
      status: false,
      msg: "error during send request!",
    };
  }
};

export default whoami;
