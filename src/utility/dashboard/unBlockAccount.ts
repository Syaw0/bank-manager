import useFetch from "../hook/useFetch";

const unBlockAccount = async (data: any, type: any): Promise<any> => {
  try {
    const result: any = useFetch(`/block/${type}/${data.id}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isBlocked: true }),
    });
    return result;
  } catch (err) {
    return {
      status: false,
      msg: "error during send request!",
    };
  }
};

export default unBlockAccount;
