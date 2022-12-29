import {
  customerList,
  employeeList,
  managerList,
} from "../../sharedData/fakeUsers";
import useFetch from "../hook/useFetch";

const getUserListData = async (type: string): Promise<any> => {
  let result;

  try {
    if (type === "Employee") {
      result = await getEmployeeList();
    } else if (type === "Manager") {
      result = await getManagerList();
    } else if (type === "Customer") {
      result = await getCustomerList();
    }

    return result;
  } catch (err) {
    return {
      status: false,
      msg: "internal error",
    };
  }
};

const getCustomerList = () => {
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

const getEmployeeList = () => {
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

const getManagerList = () => {
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

export default getUserListData;
