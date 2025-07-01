import { ulid } from "ulidx";

export function generateDataProviderId() {
  return `dap_${ulid()}`;
}
