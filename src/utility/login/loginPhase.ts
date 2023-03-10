import useFetch from "../hook/useFetch";

export type loginRequestResponse = {
  status: boolean;
  msg: string;
};

// Todo Fix this type and move it to the global

export default async ({
  username,
  password,
  isManager,
}: LoginDataType): Promise<loginRequestResponse> => {
  try {
    const result: any = await useFetch("/auth", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardId: username,
        password,
        type: isManager ? "manager" : "employee",
      }),
    });
    return result;
  } catch (err) {
    return {
      status: false,
      msg: "error during send request!",
    };
  }
};
