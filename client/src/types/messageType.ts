export interface MessageType {
  type: "error" | "success" | "warn" | "idle" | "waiting";
  msg: string;
}
