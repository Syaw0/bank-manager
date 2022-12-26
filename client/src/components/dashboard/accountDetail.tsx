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

const AccountDetail = ({ data }: any) => {
  const mainAccount = mainStore.getState().mainAccount;
  const [isSelecting, setIsSelecting] = useState(false);
  const [msgState, setMsgState] = useState<MessageType>({
    type: "idle",
    msg: "",
  });
  const blocking = async () => {
    setMsgState({ type: "waiting", msg: "waitUntil server respond" });
    const result = await blockAccount(data);
    if (result.status) {
      setMsgState({ type: "success", msg: "Successfully block this account" });
    } else {
      setMsgState({ type: "error", msg: "error happen during operation" });
    }

    setTimeout(() => {
      setMsgState({ type: "idle", msg: "idle" });
    }, 2000);
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
      setMsgState({ type: "error", msg: "error happen during operation" });
    }

    setTimeout(() => {
      setMsgState({ type: "idle", msg: "idle" });
    }, 2000);
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

        {data.type === "customer" && (
          <Flex id="item-holder">
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

        {data.type !== "customer" && (
          <Flex id="item-holder">
            <Text
              css={{
                flexDirection: "column",
              }}
            >
              Accessibility
              {mainAccount.accessibility.find(
                (acc: string) => acc == "Change Accessibility"
              ) != null && (
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
                type={data.type}
                accessibility={data.accessibility}
                data={data}
              />
            ) : (
              <ul>
                {data.accessibility.map((acc: string) => {
                  return <li key={acc}>{acc}</li>;
                })}
              </ul>
            )}
          </Flex>
        )}

        {/* //TODO maybe i can write these statement in a better way */}

        {((data.type == "customer" &&
          mainAccount.accessibility.find((ac) => ac === "Block Customer") !=
            null) ||
          (data.type == "employee" &&
            mainAccount.accessibility.find((ac) => ac === "Block Employee") !=
              null) ||
          (data.type == "manager" &&
            mainAccount.accessibility.find((ac) => ac === "Block Manager") !=
              null)) &&
          data.id !== mainAccount.id && (
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
