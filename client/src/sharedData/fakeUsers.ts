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
  accessibility: ["Add Customer", "Block Customer", "Make Transaction"],
};

const randomManager = {
  name: "Mac",
  familyName: "Instal",
  type: "employee",
  cardId: "31232312321",
  tel: "441232131",
  id: "#1",
  block: false,
  accessibility: [
    "Add Customer",
    "Block Customer",
    "Make Transaction",
    "Add Employee",
    "Change Accessibility",
    "Add Manager",
    "Block Manager",
    "Block Employee",
    "Delete Employee",
  ],
};

export { randomCustomer, randomEmployee, randomManager };
