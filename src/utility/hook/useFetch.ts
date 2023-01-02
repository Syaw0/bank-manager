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
    return { status: false, msg: "internal error" };
  }
};

export default useFetch;
