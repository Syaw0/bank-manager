import React from "react";
import { MessageType } from "../../types/messageType";
import ErrorMessage from "./errorMessage";
import SuccessMessage from "./successMessage";
import WarnMessage from "./warnMessage";

const Message = ({ type, msg }: MessageType) => {
  return (
    <>
      {type === "warn" && <WarnMessage msg={msg} />}
      {type === "success" && <SuccessMessage msg={msg} />}
      {type === "error" && <ErrorMessage msg={msg} />}
    </>
  );
};

export default Message;
