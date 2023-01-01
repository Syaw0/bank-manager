import useFetch from "../hook/useFetch";
import transformUserData from "./transformUserData";

const getSpecificUser = async (id: string, type: string): Promise<any> => {
  try {
    const result: any = await useFetch(`/getUser/${type}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    result.data = transformUserData(result.data[0]);
    return result;
  } catch (err) {
    console.log(err);
    return {
      status: false,
      msg: "error during send request!",
    };
  }
};

export default getSpecificUser;
