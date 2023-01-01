import React, { useState } from "react";
import mainStore from "../../store/mainStore";
import Flex from "../../styles/styledComponents/flex";
import Text from "../../styles/styledComponents/text";
import { MessageType } from "../../types/messageType";
import blockAccount from "../../utility/dashboard/blockAccount";
import unBlockAccount from "../../utility/dashboard/unBlockAccount";
import capitalizeFirstLetter from "../../utility/global/capitalizeFirstLetter";
import Button from "../button/button";
import Message from "../message/message";
import AccessibilitySelect from "./accountDetail/accessibilitySelect";

// TODO type definition for data

const AccountDetail = ({ data, type }: any) => {
  const mainAccount = mainStore((state) => state.mainAccount);
  console.log("SOS", mainAccount);
  const [isSelecting, setIsSelecting] = useState(false);
  const [msgState, setMsgState] = useState<MessageType>({
    type: "idle",
    msg: "",
  });
  const blocking = async () => {
    setMsgState({ type: "waiting", msg: "waitUntil server respond" });
    const result = await blockAccount(data);
    if (result.status) {
      setMsgState({ type: "success", msg: result.msg });
    } else {
      setMsgState({ type: "error", msg: result.msg });
    }
  };

  const unBlocking = async () => {
    setMsgState({ type: "waiting", msg: "waitUntil server respond" });
    const result = await unBlockAccount(data);
    if (result.status) {
      setMsgState({
        type: "success",
        msg: "Successfully unBlock this account",
      });
    } else {
      setMsgState({ type: "error", msg: result.msg });
    }
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
          type:{capitalizeFirstLetter(type)}
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
          <Text>{data.cardID}</Text>
        </Flex>

        <Flex id="item-holder">
          <Text>Tel Number</Text>
          <Text>{data.tel}</Text>
        </Flex>

        <Flex id="item-holder">
          <Text>Type</Text>
          <Text>{capitalizeFirstLetter(type)}</Text>
        </Flex>

        <Flex id="item-holder">
          <Text>ID</Text>
          <Text>{data.id}</Text>
        </Flex>

        {type === "customer" && (
          <Flex data-testid="dash-account-items-balance" id="item-holder">
            <Text>Balance</Text>
            <Text>{data.balance}</Text>
          </Flex>
        )}

        <Flex id="item-holder">
          <Text>Account Block Status</Text>
          <Text>
            {data.block ? "Account Blocked" : "Account is not Blocked"}
          </Text>
        </Flex>

        {type !== "customer" && (
          <Flex id="item-holder">
            <Text
              css={{
                flexDirection: "column",
              }}
            >
              Accessibility
              {mainAccount.accessibility.find(
                (acc: string) => acc == "ChangeAccess"
              ) != null &&
                (data.id !== mainAccount.id || type !== mainAccount.type) && (
                  <Button
                    dataTestid="dash-account-changeAccess-button"
                    onClick={changeAccessibility}
                    placeholder="change Accessibility"
                    type="primary"
                    css={{
                      width: "fit-content",
                      padding: "2px $1",
                      subhead3: "",
                    }}
                  />
                )}
            </Text>
            {isSelecting ? (
              <AccessibilitySelect
                setMsgState={setMsgState}
                msgState={msgState}
                setSelectingDisplay={setIsSelecting}
                type={type}
                accessibility={data.accessibility}
                data={data}
              />
            ) : (
              <ul>
                {data.accessibility.map((acc: string) => {
                  return (
                    <li data-testid={`dash-account-li-${acc}`} key={acc}>
                      {acc}
                    </li>
                  );
                })}
              </ul>
            )}
          </Flex>
        )}

        {/* //TODO maybe i can write these statement in a better way */}

        {((type == "customer" &&
          mainAccount.accessibility.find((ac) => ac === "BlockCustomer") !=
            null) ||
          (type == "employee" &&
            mainAccount.accessibility.find((ac) => ac === "BlockEmployee") !=
              null) ||
          (type == "manager" &&
            mainAccount.accessibility.find((ac) => ac === "BlockManager") !=
              null)) &&
          (data.id !== mainAccount.id || type !== mainAccount.type) && (
            <Button
              disabled={msgState.type === "waiting"}
              placeholder={data.block ? "Unblock Account" : "Block Account"}
              type="primary"
              dataTestid="dash-account-block-button"
              onClick={data.block ? unBlocking : blocking}
              css={{
                width: "fit-content",
                padding: "2px $1",
                alignSelf: "start",
              }}
              color={data.block ? "success" : "error"}
            />
          )}

        <Message msg={msgState.msg} type={msgState.type} />
      </Flex>
    </Flex>
  );
};

export default AccountDetail;
