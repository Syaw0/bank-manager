import { LoginDataType } from "../../types/loginType";
import useFetch from "../hook/useFetch";

export type loginRequestResponse = {
  status: boolean;
  msg: string;
};

export default async ({
  username,
  password,
  isManager,
}: LoginDataType): Promise<loginRequestResponse> => {
  try {
    const result: any = useFetch({
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
