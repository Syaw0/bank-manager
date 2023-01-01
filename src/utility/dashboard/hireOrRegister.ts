import useFetch from "../hook/useFetch";

const register = async (type: any, formData: any): Promise<any> => {
  try {
    const result: any = await useFetch(`/addUser/${type.toLocaleLowerCase()}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return result;
  } catch (err) {
    return {
      status: false,
      msg: "error during send request!",
    };
  }
};

export default register;
