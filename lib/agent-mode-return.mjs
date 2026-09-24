export function safeAgentReturnPath(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.includes("\\") || value.startsWith("/for-agents")) {
    return "/";
  }
  return value;
}
