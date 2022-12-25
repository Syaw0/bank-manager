import React, { useState } from "react";
import Flex from "../../styles/styledComponents/flex";
import TextInput from "../../components/input/textInput";
import { LoginDataType } from "../../types/loginType";
import IconBank from "../../assest/icons/IconBank";
import Text from "../../styles/styledComponents/text";
import Button from "../../components/button/button";
import Message from "../../components/message/message";
import loginPhase from "../../utility/login/loginPhase";

type LoginState = {
  type: "idle" | "waiting" | "success" | "error";
  msg: string;
};
const Login = () => {
  const [loginData, setLoginData] = useState<LoginDataType>({
    username: "",
    password: "",
    isManager: false,
  });

  const [loginState, setLoginState] = useState<LoginState>({
    type: "idle",
    msg: "",
  });

  const startLogin = async () => {
    if (!checkInputs()) {
      setLoginState({
        type: "error",
        msg: "please fill all inputs before login",
      });
      return;
    }
    setLoginState({ type: "waiting", msg: "wait until process finish" });
    const result = await loginPhase(loginData);
    if (result.status) {
      setLoginState({ type: "success", msg: result.msg });
    } else {
      setLoginState({ type: "error", msg: result.msg });
    }
  };

  const checkInputs = (): boolean => {
    return loginData.username.trim() !== "" && loginData.password.trim() !== "";
  };

  const inputChange = (e: any) => {
    const inputType = e.currentTarget.type as string;
    const inputData = e.currentTarget.value as string;
    if (inputType === "password") {
      setLoginData((pre) => ({ ...pre, password: inputData }));
      return;
    } else if (inputType === "checkbox") {
      const checked = e.currentTarget.checked;
      setLoginData((pre) => ({ ...pre, isManager: checked }));
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
        disabled={loginState.type == "waiting" || loginState.type == "success"}
        type={"text"}
        label="Username"
        dataTestid="login-username-input"
        placeholder="enter your username..."
        value={loginData.username}
        onChange={inputChange}
        css={{ marginBottom: "$1" }}
      />
      <TextInput
        disabled={loginState.type == "waiting" || loginState.type == "success"}
        type={"password"}
        label="password"
        dataTestid="login-password-input"
        placeholder="enter your password..."
        value={loginData.password}
        onChange={inputChange}
      />
      <Button
        onClick={startLogin}
        disabled={loginState.type == "waiting" || loginState.type == "success"}
        placeholder="Login"
        dataTestid="login-button"
        type="primary"
      />
      <Flex justify={"start"} align="center">
        <Text css={{ margin: " 0 4px 0 0" }} size={"sHead2"} weight="400">
          login as manager
        </Text>
        <input
          disabled={
            loginState.type == "waiting" || loginState.type == "success"
          }
          checked={loginData.isManager}
          onChange={inputChange}
          type={"checkbox"}
        />
      </Flex>
      <Message type={loginState.type} msg={loginState.msg} />
    </Flex>
  );
};

export default Login;
