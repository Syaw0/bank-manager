import {
  customerList,
  employeeList,
  managerList,
} from "../../sharedData/fakeUsers";
import useFetch from "../hook/useFetch";

const getUserListData = async (type: string): Promise<any> => {
  // let result;
  // try {
  //   if (type === "Employees") {
  //     result = await getEmployeeList();
  //   } else if (type === "Managers") {
  //     result = await getManagerList();
  //   } else if (type === "Customers") {
  //     result = await getCustomerList();
  //   }

  //   return result;
  // } catch (err) {
  //   return {
  //     status: false,
  //     msg: "internal error",
  //   };
  // }
  return new Promise((res) => {
    setTimeout(() => {
      if (type == "Customer") {
        res({ status: true, msg: "data is ready", data: customerList });
      }
      if (type == "Employee") {
        res({ status: true, msg: "data is ready", data: employeeList });
      }
      if (type == "Manager") {
        res({ status: true, msg: "data is ready", data: managerList });
      }
    }, 0);
  });
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
