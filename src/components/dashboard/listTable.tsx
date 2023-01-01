import React from "react";
import { useNavigate } from "react-router-dom";
import mainStore from "../../store/mainStore";
import Flex from "../../styles/styledComponents/flex";

const ListTable = ({ data, type }: { data: any[]; type: string }) => {
  console.log("list ", data);
  const navigate = useNavigate();
  const openUser = (userData: any) => {
    console.log(userData);
    mainStore.getState().setCurrentAccountDetail(userData);
    navigate(`/dash/${type.toLowerCase()}s/${userData.id}`, { replace: true });
  };
  return (
    <Flex
      css={{
        marginTop: "$5",
        "& table": {
          borderCollapse: "collapse",
          width: "100%",

          "& ul": {
            listStyleType: "none",
            "& li": {},
          },

          "& th": {
            borderBottom: "1px solid $onBg300",
            subhead1: "",
            fontWeight: "400",
            color: "$onBg800",
          },
          "& td , & th": {
            padding: "8px",
            textAlign: "center",
          },

          "& td": {
            subhead1: "",
            fontWeight: "500",
            color: "$onBg900",
          },

          "& tr": {
            cursor: "pointer",
            marginBottom: "$1",
            "&:hover": {
              backgroundColor: "$onBg100",
            },
          },
        },
      }}
    >
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Family Name</th>
            <th>Account Id</th>
            <th>Card ID</th>
            {type === "Customer" ? <th>Balance</th> : <th>Accessibility</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => {
            return (
              <tr
                data-testid="table-row"
                onClick={() => {
                  openUser(d);
                }}
                key={i}
              >
                <td>{i}</td>
                <td>{d["name"]}</td>
                <td>{d["familyName"]}</td>
                <td>{d["id"]}</td>
                <td>{d["cardID"]}</td>
                {type == "Customer" && <td>{d["amount"]}</td>}
                {type != "Customer" && (
                  <td>
                    <ul>
                      {d["accessibility"].map((acc: string) => {
                        return <li key={acc}>{acc}</li>;
                      })}
                    </ul>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Flex>
  );
};

export default ListTable;
