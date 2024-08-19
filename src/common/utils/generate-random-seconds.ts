export const generateRandomSecondsBetween = (
  minSeconds: number,
  maxSeconds: number,
) => Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds;
