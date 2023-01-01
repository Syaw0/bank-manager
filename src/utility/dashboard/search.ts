import useFetch from "../hook/useFetch";
import transformUserData from "./transformUserData";

const search = async (query: string, type: string): Promise<any> => {
  try {
    const result: any = await useFetch(
      `/getUserList/${type.toLocaleLowerCase()}s?sort=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!result.data) {
      return result;
    }
    result.data = result.data.map((d: any) => {
      return transformUserData(d);
    });
    return result;
  } catch (err) {
    return {
      status: false,
      msg: "error during send request!",
    };
  }
};
export default search;
