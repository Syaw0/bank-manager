import { searchResult } from "../../sharedData/fakeUsers";
import useFetch from "../hook/useFetch";

const search = async (query: string): Promise<any> => {
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
      res({ status: true, msg: "", data: searchResult });
    }, 2000);
  });
};
export default search;
