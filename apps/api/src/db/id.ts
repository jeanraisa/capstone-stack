import { ulid } from "ulidx";

export function generateDataProviderId() {
  return `dap_${ulid()}`;
}

export function generateMetricId() {
  return `mtc_${ulid()}`;
}

export function generatePredictionId() {
  return `pre_${ulid()}`;
}
