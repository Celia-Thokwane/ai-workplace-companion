/** Reads the generated text from a server-function response, tolerating the RPC envelope. */
export function readAiText(res: unknown): string {
  const direct = (res as { text?: unknown })?.text;
  if (typeof direct === "string") return direct;
  const wrapped = (res as { result?: { text?: unknown } })?.result?.text;
  if (typeof wrapped === "string") return wrapped;
  throw new Error("The AI returned an empty response. Please try again.");
}
