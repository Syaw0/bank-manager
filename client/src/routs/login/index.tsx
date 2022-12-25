import React, { useState } from "react";
import Flex from "../../styles/styledComponents/flex";
import TextInput from "../../components/input/textInput";
import { LoginDataType } from "../../types/loginType";
import IconBank from "../../assest/icons/IconBank";
import Text from "../../styles/styledComponents/text";
import Button from "../../components/button/button";
import SuccessMessage from "../../components/message/successMessage";
import ErrorMessage from "../../components/message/errorMessage";
import WarnMessage from "../../components/message/warnMessage";

const Login = () => {
  const [loginData, setLoginData] = useState<LoginDataType>({
    username: "",
    password: "",
  });

  const inputChange = (e: any) => {
    const inputType = e.currentTarget.type as string;
    const inputData = e.currentTarget.value as string;
    if (inputType === "password") {
      setLoginData((pre) => ({ ...pre, password: inputData }));
      return;
    }
    setLoginData((pre) => ({ ...pre, username: inputData }));
  };

  return (
    <Flex
      justify="center"
      align="center"
      dir="column"
      data-testid="login-route"
      css={{ width: "250px" }}
    >
      <IconBank width={100} height={100} />

      <Text css={{ marginBottom: "$3" }} size={"h4"} italic weight={800}>
        BANK MANAGER
      </Text>

      <TextInput
        type={"text"}
        label="Username"
        placeholder="enter your username..."
        value={loginData.username}
        onChange={inputChange}
        css={{ marginBottom: "$1" }}
      />
      <TextInput
        type={"password"}
        label="password"
        placeholder="enter your password..."
        value={loginData.password}
        onChange={inputChange}
      />
      <Button placeholder="Login" type="primary" />
      <Flex justify={"start"} align="center">
        <Text css={{ margin: " 0 4px 0 0" }} size={"sHead2"} weight="400">
          login as manager
        </Text>
        <input id="loginType" type={"checkbox"} />
      </Flex>
    </Flex>
  );
};

export default Login;
