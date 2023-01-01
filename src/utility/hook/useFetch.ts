import { loginRequestResponse } from "../login/loginPhase";

const useFetch = async (
  url: string,
  metadata: any
): Promise<loginRequestResponse> => {
  try {
    const resp = await fetch(url, metadata);
    const data = await resp.json();
    return data;
  } catch (err: any) {
    console.log(err);
    return { status: false, msg: "internal error" };
  }
};

export default useFetch;
