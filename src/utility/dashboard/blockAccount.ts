import useFetch from "../hook/useFetch";

const blockAccount = async (data: any, type: any): Promise<any> => {
  try {
    const result: any = useFetch(`/block/${type}/${data.id}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isBlocked: false }),
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

export default blockAccount;
