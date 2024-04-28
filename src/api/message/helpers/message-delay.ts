export const messageDelay = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds));
