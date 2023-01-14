import React, { useRef, useState } from "react";
import Button from "../../../components/button/button";
import TextInput from "../../../components/input/textInput";
import Message from "../../../components/message/message";
import Flex from "../../../styles/styledComponents/flex";
import Text from "../../../styles/styledComponents/text";
import performTransaction from "../../../utility/dashboard/performTransaction";

const initState = {
  originAccount: "",
  destinationAccount: "",
  amount: "",
};

const MakeTransaction = () => {
  const [formData, setFormData] = useState(initState);
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

  const checkInput = () => {
    const inputs = inpHolder.current.getElementsByTagName("input");
    for (let i = 0; i != inputs.length; i++) {
      if (inputs[i].value.trim() == "") {
        return false;
      }
    }

    return true;
  };

  const performAction = async () => {
    if (!checkInput()) {
      setMsgState({ type: "error", msg: "fill all inputs" });
      return;
    }
    if (formData.destinationAccount === formData.originAccount) {
      setMsgState({ type: "error", msg: "origin and destination is same" });
      return;
    }
    setMsgState({ type: "waiting", msg: "please wait to server response" });
    const result = await performTransaction(formData);
    if (result.status) {
      setMsgState({ type: "success", msg: result.msg });
      setFormData(initState);
      return;
    }
    setMsgState({ type: "error", msg: result.msg });
  };

  return (
    <Flex
      data-testid="makeTransaction-route"
      dir="column"
      justify="start"
      align="center"
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
          Make Transaction
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
          label="Origin Account"
          placeholder="enter origin account ID"
          dataTestid="dash-makeTransaction-oId"
          value={formData.originAccount}
          type="text"
          onChange={handleForm}
          name="originAccount"
        />

        <TextInput
          disabled={false}
          label="Destination Account"
          placeholder="enter destination account ID"
          dataTestid="dash-makeTransaction-dId"
          value={formData.destinationAccount}
          type="text"
          onChange={handleForm}
          name="destinationAccount"
        />

        <TextInput
          disabled={false}
          label="Amount Of Money"
          placeholder="enter how many for transaction"
          dataTestid="dash-makeTransaction-amount"
          value={formData.amount}
          type="text"
          onChange={handleForm}
          name="amount"
        />

        <Button
          disabled={msgState.type === "waiting"}
          placeholder="Perform Transaction"
          type="primary"
          dataTestid="dash-makeTransaction-submit"
          onClick={performAction}
        />
        <Message msg={msgState.msg} type={msgState.type} />
      </Flex>
    </Flex>
  );
};

export default MakeTransaction;
