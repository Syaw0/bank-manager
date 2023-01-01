import useFetch from "../hook/useFetch";

const logout = async (id: any): Promise<any> => {
  try {
    console.log(id);
    const result: any = await useFetch(`/logout/${id}`, {
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

export default logout;
