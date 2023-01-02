import React, { useRef, useState } from "react";
import {
  allAccessibilityInObj,
  employeeAccessibility,
} from "../../sharedData/allAccessibility";
import Flex from "../../styles/styledComponents/flex";
import Text from "../../styles/styledComponents/text";
import { MessageType } from "../../types/messageType";
import register from "../../utility/dashboard/hireOrRegister";
import Button from "../button/button";
import TextInput from "../input/textInput";
import Message from "../message/message";

interface addNewUser {
  type: "Employee" | "Customer" | "Manager";
}

const initForm = {
  name: "",
  familyName: "",
  cardId: "",
  id: "",
  tel: "",
  amount: "",
  password: "",
  accessibility: [""],
};

// TODO Restrict to inputs type!!

const AddNewUser = ({ type }: addNewUser) => {
  const [formData, setFormData] = useState(initForm);

  const inpHolder = useRef<any>(null);

  const [msgState, setMsgState] = useState<MessageType>({
    type: "idle",
    msg: "",
  });

  const handleForm = (e: any) => {
    const inpName = e.currentTarget.name;
    const inpValue = e.currentTarget.value;
    setFormData((pre) => ({ ...pre, [inpName]: inpValue }));
  };

  const setSelections = (e: any) => {
    const arr: string[] = [];
    const options = e.currentTarget.options;
    for (let i = 0; i != options.length; i++) {
      if (options[i].selected) {
        arr.push(options[i].value);
      }
    }
    setFormData((pre) => ({ ...pre, accessibility: arr }));
  };

  const hireOrRegister = async () => {
    if (!checkInput()) {
      setMsgState({ type: "error", msg: "please fill all inputs" });
      return;
    }
    setMsgState({ type: "waiting", msg: "wait until process end" });
    const result = await register(type, formData);
    if (result.status) {
      setMsgState({ type: "success", msg: result.msg });
      setFormData(initForm);
      return;
    }
    setMsgState({ type: "error", msg: result.msg });
  };

  const checkInput = () => {
    const inputs = inpHolder.current.getElementsByTagName("input");
    const select = inpHolder.current.getElementsByTagName("select");

    for (let i = 0; i != inputs.length; i++) {
      if (inputs[i].value.trim() == "") {
        return false;
      }
    }
    if (select.length != 0) {
      if (formData.accessibility.length == 0) {
        return false;
      }
    }
    return true;
  };

  const accessibility: any =
    type.search("Employee") == -1
      ? allAccessibilityInObj
      : employeeAccessibility;

  return (
    <Flex
      dir="column"
      justify="start"
      align="center"
      css={{ overflowY: "auto" }}
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
          Register {type}
        </Text>
      </Flex>

      <Flex
        ref={inpHolder}
        dir="column"
        css={{
          width: "50%",
          padding: "$3 0",
        }}
      >
        <TextInput
          disabled={false}
          label="Name"
          placeholder="enter name"
          dataTestid="dash-add-name"
          value={formData.name}
          type="text"
          onChange={handleForm}
          name="name"
        />

        <TextInput
          disabled={false}
          label="FamilyName"
          placeholder="enter FamilyName"
          dataTestid="dash-add-familyName"
          value={formData.familyName}
          type="text"
          onChange={handleForm}
          name="familyName"
        />

        <TextInput
          disabled={false}
          label="Card ID"
          placeholder="enter card id"
          dataTestid="dash-add-cardId"
          value={formData.cardId}
          type="text"
          onChange={handleForm}
          name="cardId"
        />

        <TextInput
          disabled={false}
          label="Tel Number"
          placeholder="enter tel number"
          dataTestid="dash-add-telNumber"
          value={formData.tel}
          type="text"
          onChange={handleForm}
          name="tel"
        />

        {type !== "Customer" && (
          <TextInput
            disabled={false}
            label="Password"
            placeholder="enter password of account"
            dataTestid="dash-add-password"
            value={formData.password}
            type="password"
            onChange={handleForm}
            name="password"
          />
        )}

        {type === "Customer" && (
          <TextInput
            disabled={false}
            label="Initial Value"
            placeholder="enter value ..."
            dataTestid="dash-add-initValue"
            value={formData.amount}
            type="text"
            onChange={handleForm}
            name="amount"
          />
        )}

        {type !== "Customer" && (
          <>
            <Text
              size="sHead1"
              weight="400"
              css={{
                justifyContent: "left",
                margin: "$1 0",
              }}
            >
              Accessibility
            </Text>
            <select
              data-testid="dash-add-select"
              onChange={setSelections}
              multiple
              size={4}
            >
              {Object.keys(accessibility).map((acc) => {
                return (
                  <option key={acc} value={acc}>
                    {accessibility[acc]}
                  </option>
                );
              })}
            </select>
          </>
        )}

        <Button
          placeholder="Submit"
          type="primary"
          dataTestid="dash-add-submit"
          onClick={hireOrRegister}
        />
        <Message msg={msgState.msg} type={msgState.type} />
      </Flex>
    </Flex>
  );
};

export default AddNewUser;
