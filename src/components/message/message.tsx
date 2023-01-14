import React from "react";
import ErrorMessage from "./errorMessage";
import SuccessMessage from "./successMessage";
import WaitMessage from "./waitMessage";
import WarnMessage from "./warnMessage";

const Message = ({ type, msg }: MessageType) => {
  return (
    <>
      {type === "warn" && <WarnMessage msg={msg} />}
      {type === "success" && <SuccessMessage msg={msg} />}
      {type === "error" && <ErrorMessage msg={msg} />}
      {type === "waiting" && <WaitMessage msg={msg} />}
    </>
  );
};

export default Message;
