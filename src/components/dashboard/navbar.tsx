import React from "react";
import IconBank from "../../assest/icons/IconBank";
import IcoLogout from "../../assest/icons/IconLogout";
import Flex from "../../styles/styledComponents/flex";
import Text from "../../styles/styledComponents/text";
import Button from "../button/button";
import IconAccount from "../../assest/icons/IconAccount";
import IconAddAccount from "../../assest/icons/IconAddAccount";
import IconAccounts from "../../assest/icons/IconAccounts";
import IconTransaction from "../../assest/icons/IconTransaction";
import { Link } from "react-router-dom";
import IconManager from "../../assest/icons/IconManager";
import IconAddManager from "../../assest/icons/IconAddManager";
import mainStore from "../../store/mainStore";
import logout from "../../utility/dashboard/logout";

// ? We are do not render whose item not access by user but i want
// TODO  to disable and show lock icon on it

const Navbar = () => {
  const data = mainStore((state) => state.mainAccount);
  const handlingLogOut = async () => {
    const result = await logout(data.id);
  };
  return (
    <Flex
      dir={"column"}
      justify={"between"}
      align={"center"}
      css={{
        backgroundColor: "$primary",
        width: "280px",
        height: "100%",
        borderRadius: "0 30px 30px 0",
        boxShadow: "$8dp",
        padding: "$3 $2",
        "& a": {
          width: "100%",
          height: "fit-content",
          // backgroundColor: "pink",
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
          "& button": {
            justifyContent: "start",
            width: "100%",
            height: "100%",
            color: "$onPrimary800",
            padding: "3px",
            borderRadius: "5px",
            "& svg": {
              fill: "$onPrimary800",
              width: "10%",
            },
            "&:hover": {
              backgroundColor: "$onPrimary200",
              color: "$onPrimary",
              "& svg": {
                fill: "$onPrimary",
              },
            },
          },
        },
      }}
    >
      <Flex dir="column" justify="center" align="center">
        <Text
          size={"h5"}
          weight="700"
          italic
          css={{
            width: "100%",
            justifyContent: "start",
            color: "$onPrimary",
            "& svg": {
              fill: "$onPrimary",
              marginLeft: "5px",
            },
          }}
        >
          BANK MANAGER {<IconBank width={25} height={25} />}
        </Text>
        {data.type === "manager" && (
          <Flex
            css={{
              padding: "$5 0 0 0 ",
            }}
            dir="column"
            justify="center"
            align="center"
          >
            <Text
              size="sHead2"
              weight={"500"}
              css={{
                width: "100%",
                justifyContent: "start",
                color: "$onPrimary700",
              }}
            >
              Manager
            </Text>

            <Link
              to={`/dash/managers/${data.id}`}
              data-testid="dash-myAccount-manager-link"
            >
              <Button
                placeholder="My Account"
                type="shadow"
                disabled={data.block === 1}
                dataTestid="dash-myAccount-manager-button"
                StartIcon={<IconManager width={20} height={20} />}
              />
            </Link>

            {data.accessibility.find((n) => n === "AddEmployee") && (
              <Link to={"/dash/addEmployee"}>
                <Button
                  disabled={data.block === 1}
                  placeholder="Hire Employee"
                  type="shadow"
                  dataTestid="dash-hireEmployee-button"
                  StartIcon={<IconAddAccount width={20} height={20} />}
                />
              </Link>
            )}

            {data.accessibility.find((n) => n === "ReadEmployeeData") && (
              <Link to={"/dash/employees"}>
                <Button
                  disabled={data.block === 1}
                  placeholder="Employees"
                  type="shadow"
                  dataTestid="dash-employees-button"
                  StartIcon={<IconAccounts width={20} height={20} />}
                />
              </Link>
            )}
            {data.accessibility.find((n) => n === "AddManager") && (
              <Link to={"/dash/addManager"}>
                <Button
                  disabled={data.block === 1}
                  placeholder="Add Manager"
                  type="shadow"
                  dataTestid="dash-addManager-button"
                  StartIcon={<IconAddManager width={16} height={16} />}
                />
              </Link>
            )}
            {data.accessibility.find((n) => n === "ReadManagerData") && (
              <Link to={"/dash/managers"}>
                <Button
                  disabled={data.block === 1}
                  placeholder="Managers"
                  type="shadow"
                  dataTestid="dash-managers-button"
                  StartIcon={<IconAccounts width={20} height={20} />}
                />
              </Link>
            )}
          </Flex>
        )}

        <Flex
          css={{
            padding: "$3 0",
          }}
          dir="column"
          justify="center"
          align="center"
        >
          <Text
            size="sHead2"
            weight={"500"}
            css={{
              width: "100%",
              justifyContent: "start",
              color: "$onPrimary700",
            }}
          >
            Employee
          </Text>

          {data.type !== "manager" && (
            <Link to={`/dash/employees/${data.id}`}>
              <Button
                disabled={data.block === 1}
                placeholder="My Account"
                type="shadow"
                dataTestid="dash-myAccount-employee-button"
                StartIcon={<IconAccount width={16} height={16} />}
              />
            </Link>
          )}
          {data.accessibility.find((n) => n === "AddCustomer") && (
            <Link to={"/dash/addCustomer"}>
              <Button
                disabled={data.block === 1}
                placeholder="Add Customer"
                type="shadow"
                dataTestid="dash-addCustomer-button"
                StartIcon={<IconAddAccount width={20} height={20} />}
              />
            </Link>
          )}

          {data.accessibility.find((n) => n === "ReadCustomerData") && (
            <Link to={"/dash/customers"}>
              <Button
                disabled={data.block === 1}
                placeholder="Customers"
                type="shadow"
                dataTestid="dash-customers-button"
                StartIcon={<IconAccounts width={20} height={20} />}
              />
            </Link>
          )}

          {data.accessibility.find((n) => n === "MakeTransaction") && (
            <Link to={"/dash/makeTransaction"}>
              <Button
                disabled={data.block === 1}
                placeholder="Make Transaction"
                type="shadow"
                dataTestid="dash-makeTransaction-button"
                StartIcon={<IconTransaction width={20} height={20} />}
              />
            </Link>
          )}
        </Flex>
      </Flex>

      <Link to={""}>
        <Button
          placeholder="Logout"
          type="shadow"
          dataTestid="dash-logout-button"
          StartIcon={<IcoLogout width={20} height={20} />}
          onClick={handlingLogOut}
        />
      </Link>
    </Flex>
  );
};

export default Navbar;
