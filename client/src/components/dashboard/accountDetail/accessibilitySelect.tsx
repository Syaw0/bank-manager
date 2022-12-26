import React, { useRef, useState } from "react";
import Flex from "../../../styles/styledComponents/flex";
import allAccessibility, {
  employeeAccessibility,
} from "../../../sharedData/allAccessibility";
import Button from "../../button/button";
import changeAccessibility from "../../../utility/dashboard/changeAccessibility";

type accessibilitySelect = {
  setMsgState: any;
  msgState: any;
  setSelectingDisplay: any;
  type: string;
  accessibility: string[];
  data: any;
};

const AccessibilitySelect = ({
  setMsgState,
  msgState,
  setSelectingDisplay,
  type,
  accessibility,
  data,
}: accessibilitySelect) => {
  const accessibilities =
    type === "manager" ? allAccessibility : employeeAccessibility;
  let accObj: any = {};
  accessibilities.forEach((acc) => {
    accObj[acc] = accessibility.find((a) => a === acc) != null;
  });

  const [cheaps, setCheaps] = useState(accObj);

  const saveChanges = async () => {
    setMsgState({ type: "waiting", msg: "wait for server response" });
    const result = await changeAccessibility(cheaps, data);

    if (result.status) {
      setMsgState({
        type: "success",
        msg: "Successfully Change access of this account",
      });
    } else {
      setMsgState({ type: "error", msg: "error happen during operation" });
    }
    setTimeout(() => {
      setMsgState({ type: "idle", msg: "idle" });
    }, 2000);
  };
  const cancelOperation = () => {
    setSelectingDisplay(false);
  };

  return (
    <Flex
      css={{
        width: "70%",
        justifyContent: "end",
        flexWrap: "wrap",
      }}
    >
      {Object.keys(accObj).map((acc) => {
        const itemValue = cheaps[acc];
        return (
          <Button
            disabled={msgState.type === "waiting"}
            dataTestid={`dash-account-select-${acc}`}
            key={acc}
            placeholder={acc}
            type={cheaps[acc] ? "primary" : "outline"}
            onClick={() => {
              setCheaps((s: any) => ({ ...s, [acc]: !itemValue }));
            }}
            css={{
              width: "fit-content",
              subhead2: "",
              padding: "0 5px",
              margin: "2px",
            }}
          />
        );
      })}

      <Flex
        align="end"
        justify="end"
        css={{
          "& button": {
            width: "fit-content",
            padding: "0 $2",
          },
        }}
      >
        <Button
          disabled={msgState.type == "waiting"}
          placeholder="Cancel"
          type="shadow"
          dataTestid="dash-account-select-cancel-btn"
          onClick={cancelOperation}
        />

        <Button
          disabled={msgState.type == "waiting"}
          placeholder="Save"
          type="primary"
          dataTestid="dash-account-select-save-btn"
          onClick={saveChanges}
        />
      </Flex>
    </Flex>
  );
};

export default AccessibilitySelect;
