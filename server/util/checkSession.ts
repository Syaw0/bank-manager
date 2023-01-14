import readSession from "../db/readSession.js";
import sessions from "../db/sessions.json" assert { type: "json" };

const checkSession = (sessionCookie) => {
  const sessions = JSON.parse(readSession());
  if (sessionCookie in sessions.sessions) {
    return {
      status: true,
      msg: "found session in storage",
      data: sessions.sessions[sessionCookie],
    };
  } else {
    return { status: false, msg: "can not found session ,user is not login" };
  }
};

export default checkSession;
