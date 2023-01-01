const allAccessibility = [
  "AddCustomer",
  "BlockCustomer",
  "MakeTransaction",
  "AddEmployee",
  "ChangeAccessibility",
  "AddManager",
  "BlockManager",
  "BlockEmployee",
  "DeleteEmployee",
  "ReadCustomerData",
  "ReadManagerData",
  "ReadEmployeeData",
];

const allAccessibilityInObj = {
  AddCustomer: "Add Customer",
  BlockCustomer: "Block Customer",
  MakeTransaction: "Make Transaction",
  AddEmployee: "Add Employee",
  ChangeAccess: "Change Access",
  AddManager: "Add Manager",
  BlockManager: "Block Manager",
  BlockEmployee: "Block Employee",
  DeleteEmployee: "Delete Employee",
  ReadCustomerData: "Read CustomerData",
  ReadManagerData: "Read ManagerData",
  ReadEmployeeData: "Read EmployeeData",
};

const employeeAccessibility = {
  AddCustomer: "Add Customer",
  BlockCustomer: "Block Customer",
  MakeTransaction: "Make Transaction",
  ReadCustomerData: "Read CustomerData",
};

export {
  allAccessibility as default,
  employeeAccessibility,
  allAccessibilityInObj,
};
