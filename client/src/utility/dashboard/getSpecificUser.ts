import {
  randomCustomer,
  randomEmployee,
  randomManager,
} from "../../sharedData/fakeUsers";
import useFetch from "../hook/useFetch";

const getSpecificUser = async (id: string, type: string): Promise<any> => {
  try {
    const result: any = useFetch("", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ s: "" }),
    });
    return result;
  } catch (err) {
    return {
      status: false,
      msg: "error during send request!",
    };
  }
};

export default getSpecificUser;
