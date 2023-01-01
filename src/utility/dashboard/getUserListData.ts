import {
  customerList,
  employeeList,
  managerList,
} from "../../sharedData/fakeUsers";
import useFetch from "../hook/useFetch";
import transformUserData from "./transformUserData";

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

const getCustomerList = async () => {
  try {
    const result: any = await useFetch("/getUserList/customers", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // result.data = result.data.map((d: any) => {
    //   return transformUserData(d);
    // });
    // console.log(result);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return {
      status: false,
      msg: "error during send request!",
    };
  }
};

const getEmployeeList = async () => {
  try {
    const result: any = await useFetch("/getUserList/employees", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    result.data = result.data.map((d: any) => {
      return transformUserData(d);
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return {
      status: false,
      msg: "error during send request!",
    };
  }
};

const getManagerList = async () => {
  try {
    const result: any = await useFetch("/getUserList/managers", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    result.data = result.data.map((d: any) => {
      return transformUserData(d);
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return {
      status: false,
      msg: "error during send request!",
    };
  }
};

export default getUserListData;
