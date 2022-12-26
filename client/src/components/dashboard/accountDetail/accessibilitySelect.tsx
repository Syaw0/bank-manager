import React, { useRef } from "react";
import Flex from "../../../styles/styledComponents/flex";
import allAccessibility, {
  employeeAccessibility,
} from "../../../sharedData/allAccessibility";
import Button from "../../button/button";

type accessibilitySelect = {
  type: string;
  accessibility: string[];
};

const AccessibilitySelect = ({ type, accessibility }: accessibilitySelect) => {
  const selectEl: any = useRef(null);

  const saveChanges = () => {
    console.log(selectEl.current.value);
  };
  const cancelOperation = () => {};

  const accessibilities =
    type === "manager" ? allAccessibility : employeeAccessibility;
  return (
    <Flex
      dir="column"
      justify="end"
      align="end"
      css={{
        width: "50%",
        justifyContent: "end",
        "& select": {
          padding: "0 $2",
        },
      }}
    >
      {/* //TODO write input type checkbox ! */}
      <select ref={selectEl} name="allAccessibility" multiple>
        {accessibilities.map((acc) => {
          return (
            <option
              key={acc}
              selected={accessibility.find((s) => s == acc) != null}
              value={acc}
            >
              {acc}
            </option>
          );
        })}
      </select>
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
          placeholder="Cancel"
          type="shadow"
          dataTestid="dash-account-select-cancel-btn"
          onClick={cancelOperation}
        />

        <Button
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
