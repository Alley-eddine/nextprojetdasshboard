// Network latency simulation imposed by the assignment — do not modify.
export const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
