import useFetch from "../hook/useFetch";

const logout = async (id: any): Promise<any> => {
  try {
    const result: any = await useFetch(`/logout/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result;
  } catch (err) {
    return {
      status: false,
      msg: "error during send request!",
    };
  }
};

export default logout;
