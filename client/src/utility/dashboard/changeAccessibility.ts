import useFetch from "../hook/useFetch";

const changeAccessibility = async (
  changedAccess: any,
  data: any
): Promise<any> => {
  try {
    const result: any = useFetch("", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ s: "" }),
    });
    return result;
  } catch (err) {
    return {
      status: false,
      msg: "error during send request!",
    };
  }
};

export default changeAccessibility;
