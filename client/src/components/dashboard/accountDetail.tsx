import React, { useState } from "react";
import Flex from "../../styles/styledComponents/flex";
import Text from "../../styles/styledComponents/text";
import capitalizeFirstLetter from "../../utility/global/capitalizeFirstLetter";
import Button from "../button/button";
import AccessibilitySelect from "./accountDetail/accessibilitySelect";

// TODO type definition for data

const AccountDetail = ({ data }: any) => {
  const [isSelecting, setIsSelecting] = useState(false);

  const blockAccount = () => {
    console.log("block this acc");
  };
  const changeAccessibility = () => {
    if (!isSelecting) {
      setIsSelecting(true);
    }
  };

  return (
    <Flex
      dir="column"
      justify="center"
      align="center"
      css={{
        padding: "$4 0",
        overflowY: "auto",
      }}
    >
      <Flex
        dir="column"
        css={{
          marginTop: "$4",
        }}
      >
        <Text
          size="h4"
          weight="500"
          css={{ justifyContent: "start", color: "$onBg900" }}
        >
          Account Detail
        </Text>

        <Text
          size="sHead2"
          weight="400"
          css={{ justifyContent: "start", color: "$onBg800" }}
        >
          type:{capitalizeFirstLetter(data.type)}
        </Text>
      </Flex>

      <Flex
        dir="column"
        justify="center"
        align="center"
        css={{
          width: "65%",

          "#item-holder": {
            borderBottom: "1px solid $onBg100",
            padding: "$1 0",
            "& p:first-child": {
              width: "50%",
              justifyContent: "start",
              alignItems: "start",
              subhead1: "",
              fontWeight: "500",
              color: "$onBg800",
            },

            "& p:last-child , & ul ": {
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              alignItems: "end",
              subhead1: "",
              fontWeight: "600",
              color: "$onBg900",
              "& li": {
                listStyleType: "none",
              },
            },
          },
        }}
      >
        <Flex id="item-holder">
          <Text>Name</Text>
          <Text>{capitalizeFirstLetter(data.name)}</Text>
        </Flex>

        <Flex id="item-holder">
          <Text>FamilyName</Text>
          <Text>{capitalizeFirstLetter(data.familyName)}</Text>
        </Flex>

        <Flex id="item-holder">
          <Text>Card ID</Text>
          <Text>{data.cardId}</Text>
        </Flex>

        <Flex id="item-holder">
          <Text>Tel Number</Text>
          <Text>{data.tel}</Text>
        </Flex>

        <Flex id="item-holder">
          <Text>Type</Text>
          <Text>{capitalizeFirstLetter(data.type)}</Text>
        </Flex>

        <Flex id="item-holder">
          <Text>ID</Text>
          <Text>{data.id}</Text>
        </Flex>

        <Flex id="item-holder">
          <Text>Account Block Status</Text>
          <Text>
            {data.block ? "Account Blocked" : "Account is not Blocked"}
          </Text>
        </Flex>

        <Flex id="item-holder">
          <Text
            css={{
              flexDirection: "column",
            }}
          >
            Accessibility
            <Button
              dataTestid="dash-account-changeAccess-button"
              onClick={changeAccessibility}
              placeholder="change Accessibility"
              type="primary"
              css={{ width: "fit-content", padding: "2px $1", subhead3: "" }}
            />
          </Text>
          {isSelecting ? (
            <AccessibilitySelect
              type={data.type}
              accessibility={data.accessibility}
            />
          ) : (
            <ul>
              {data.accessibility.map((acc: string) => {
                return <li key={acc}>{acc}</li>;
              })}
            </ul>
          )}
        </Flex>

        <Button
          placeholder={data.block ? "Unblock Account" : "Block Account"}
          type="primary"
          dataTestid="dash-account-block-button"
          onClick={blockAccount}
          css={{
            width: "fit-content",
            padding: "2px $1",
            alignSelf: "start",
          }}
          color={data.block ? "success" : "error"}
        />
      </Flex>
    </Flex>
  );
};

export default AccountDetail;

// {Object.keys(data).map((v) => {
//   let com;
//   if (typeof data[v] === "object") {
//     com = (
//       <Flex css={{ border: "1px solid black", width: "50%" }}>
//         <ul>
//           {data[v].map((acc) => {
//             console.log(acc);
//             return <li>{acc}</li>;
//           })}
//         </ul>
//       </Flex>
//     );
//   }
//   return (
//     <Flex justify="around">
//       <Text css={{ border: "1px solid black", width: "50%" }}>
//         {v}:
//       </Text>
//       {com != null ? (
//         com
//       ) : (
//         <Text css={{ width: "50%" }}>{`${data[v]}`}</Text>
//       )}
//     </Flex>
//   );
// })}
