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

// ? We are do not render whose item not access by user but i want
// TODO  to disable and show lock icon on it

const Navbar = () => {
  const data = mainStore.getState().mainAccount;
  console.log(data);
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
          textDecoration: "none",
          "& button": {
            justifyContent: "start",
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

            <Link to={"/dash/managers/1"}>
              <Button
                placeholder="My Account"
                type="shadow"
                disabled={data.block}
                dataTestid="dash-myAccount-manager-button"
                StartIcon={<IconManager width={20} height={20} />}
                onClick={() => {}}
              />
            </Link>

            {data.accessibility.find((n) => n === "Add Employee") && (
              <Link to={"/dash/addEmployee"}>
                <Button
                  disabled={data.block}
                  placeholder="Hire Employee"
                  type="shadow"
                  dataTestid="dash-hireEmployee-button"
                  StartIcon={<IconAddAccount width={20} height={20} />}
                />
              </Link>
            )}

            <Link to={"/dash/employees"}>
              <Button
                disabled={data.block}
                placeholder="Employees"
                type="shadow"
                dataTestid="dash-employees-button"
                StartIcon={<IconAccounts width={20} height={20} />}
              />
            </Link>
            {data.accessibility.find((n) => n === "Add Manager") && (
              <Link to={"/dash/addManager"}>
                <Button
                  disabled={data.block}
                  placeholder="Add Manager"
                  type="shadow"
                  dataTestid="dash-addManager-button"
                  StartIcon={<IconAddManager width={16} height={16} />}
                />
              </Link>
            )}
            <Link to={"/dash/managers"}>
              <Button
                disabled={data.block}
                placeholder="Managers"
                type="shadow"
                dataTestid="dash-managers-button"
                StartIcon={<IconAccounts width={20} height={20} />}
              />
            </Link>
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
            <Link to={"/dash/employees/1"}>
              <Button
                disabled={data.block}
                placeholder="My Account"
                type="shadow"
                dataTestid="dash-myAccount-employee-button"
                StartIcon={<IconAccount width={16} height={16} />}
                onClick={() => {}}
              />
            </Link>
          )}
          {data.accessibility.find((n) => n === "Add Customer") && (
            <Link to={"/dash/addCustomer"}>
              <Button
                disabled={data.block}
                placeholder="Add Customer"
                type="shadow"
                dataTestid="dash-addCustomer-button"
                StartIcon={<IconAddAccount width={20} height={20} />}
              />
            </Link>
          )}

          <Link to={"/dash/customers"}>
            <Button
              disabled={data.block}
              placeholder="Customers"
              type="shadow"
              dataTestid="dash-customers-button"
              StartIcon={<IconAccounts width={20} height={20} />}
            />
          </Link>

          {data.accessibility.find((n) => n === "Make Transaction") && (
            <Link to={"/dash/makeTransaction"}>
              <Button
                disabled={data.block}
                placeholder="Make Transaction"
                type="shadow"
                dataTestid="dash-makeTransaction-button"
                StartIcon={<IconTransaction width={20} height={20} />}
              />
            </Link>
          )}
        </Flex>
      </Flex>

      <Link to={"/login"}>
        <Button
          placeholder="Logout"
          type="shadow"
          dataTestid="dash-logout-button"
          StartIcon={<IcoLogout width={20} height={20} />}
        />
      </Link>
    </Flex>
  );
};

export default Navbar;
