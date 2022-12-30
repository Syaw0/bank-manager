import {
  randomCustomer,
  randomEmployee,
  randomManager,
} from "../../sharedData/fakeUsers";
import useFetch from "../hook/useFetch";

const getSpecificUser = async (id: string, type: string): Promise<any> => {
  try {
    const result: any = await useFetch(`/getUser/${type}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
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

export default getSpecificUser;
