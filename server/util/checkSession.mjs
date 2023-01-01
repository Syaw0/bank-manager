import readSession from "../db/readSession.mjs";
import sessions from "../db/sessions.json" assert { type: "json" };

const checkSession = (sessionCookie) => {
  const sessions = JSON.parse(readSession());
  console.log("theeeeeeeeeeeeeeeeeeeeeeeeeees is session", sessions);
  if (sessionCookie in sessions.sessions) {
    console.log("its exist");
    return {
      status: true,
      msg: "found session in storage",
      data: sessions.sessions[sessionCookie],
    };
  } else {
    console.log("its not exist");
    return { status: false, msg: "can not found session ,user is not login" };
  }
};

export default checkSession;
