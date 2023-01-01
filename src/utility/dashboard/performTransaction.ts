import useFetch from "../hook/useFetch";
import { transformTransactionInformationToNumber } from "./transformUserData";

const performTransaction = async (formData: any): Promise<any> => {
  try {
    const result: any = useFetch("/makeTransaction", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformTransactionInformationToNumber(formData)),
    });
    return result;
  } catch (err) {
    return {
      status: false,
      msg: "error during send request!",
    };
  }
};

export default performTransaction;
