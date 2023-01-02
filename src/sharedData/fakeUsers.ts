const randomCustomer = {
  name: "john",
  familyName: "boroto",
  type: "customer",
  cardId: "12312321",
  tel: "1232131",
  id: "331231231",
  block: false,
  balance: "200$",
};

const randomEmployee = {
  name: "Mac",
  familyName: "Instal",
  type: "employee",
  cardId: "31232312321",
  tel: "441232131",
  id: "551231231",
  block: false,
  accessibility: [
    "AddCustomer",
    "BlockCustomer",
    "MakeTransaction",
    "ReadCustomerData",
  ],
};

const randomManager = {
  name: "Mac",
  familyName: "Instal",
  type: "manager",
  cardId: "31232312321",
  tel: "441232131",
  id: "41",
  block: false,
  accessibility: [
    "AddCustomer",
    "BlockCustomer",
    "MakeTransaction",
    "AddEmployee",
    "ChangeAccess",
    "AddManager",
    "BlockManager",
    "BlockEmployee",
    "DeleteEmployee",
    "ReadCustomerData",
    "ReadManagerData",
    "ReadEmployeeData",
  ],
};

const employeeList = [
  {
    name: "Mac",
    familyName: "Instal",
    type: "employee",
    cardId: "31232312321",
    tel: "441232131",
    id: "551231231",
    block: false,
    accessibility: [
      "AddCustomer",
      "BlockCustomer",
      "MakeTransaction",
      "ReadCustomerData",
    ],
  },
  {
    name: "habito",
    familyName: "qaro",
    type: "employee",
    cardId: "331232312321",
    tel: "1441232131",
    id: "4551231231",
    block: false,
    accessibility: ["BlockCustomer", "MakeTransaction", "ReadCustomerData"],
  },
  {
    name: "posita",
    familyName: "inal",
    type: "employee",
    cardId: "442",
    tel: "455",
    id: "55",
    block: false,
    accessibility: [
      "AddCustomer",
      "BlockCustomer",
      "MakeTransaction",
      "ReadCustomerData",
    ],
  },
];

const customerList = [
  {
    name: "john",
    familyName: "boroto",
    type: "customer",
    cardId: "12312321",
    tel: "1232131",
    id: "331231231",
    block: false,
    amount: "200$",
  },
  {
    name: "arigato",
    familyName: "mosay",
    type: "customer",
    cardId: "456",
    tel: "724",
    id: "146",
    block: false,
    amount: "200$",
  },
  {
    name: "narutu",
    familyName: "qqq",
    type: "customer",
    cardId: "1123",
    tel: "4444",
    id: "3312312111131",
    block: false,
    amount: "200$",
  },
];

const searchResult = [randomCustomer, randomCustomer];

const managerList = [randomManager, randomManager, randomManager];

export {
  randomCustomer,
  randomEmployee,
  randomManager,
  managerList,
  customerList,
  employeeList,
  searchResult,
};
