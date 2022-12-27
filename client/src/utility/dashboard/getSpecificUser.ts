import {
  randomCustomer,
  randomEmployee,
  randomManager,
} from "../../sharedData/fakeUsers";
import useFetch from "../hook/useFetch";

const getSpecificUser = async (id: string, type: string): Promise<any> => {
  // try {
  //   const result: any = useFetch("", {
  //     method: "POST",

  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ s: "" }),
  //   });
  //   return result;
  // } catch (err) {
  //   return {
  //     status: false,
  //     msg: "error during send request!",
  //   };
  // }

  return new Promise((res) => {
    setTimeout(() => {
      if (type === "customer") {
        res({ status: true, msg: "", data: randomCustomer });
      }
      if (type === "employee") {
        res({ status: true, msg: "", data: randomEmployee });
      }
      if (type === "manager") {
        res({ status: true, msg: "", data: randomManager });
      }
    }, 2000);
  });
};

export default getSpecificUser;
