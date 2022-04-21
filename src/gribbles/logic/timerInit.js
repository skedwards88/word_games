export function timerInit({ gameLength, bonusTime }) {
  // use the specified settings, otherwise check local storage, otherwise use default
  gameLength =
    gameLength || JSON.parse(localStorage.getItem("gameLength")) || 30;
  // bonusTime can be 0, so use the nullish operator
  bonusTime = bonusTime ?? JSON.parse(localStorage.getItem("bonusTime")) ?? 5;
  return {
    remainingTime: gameLength,
    isRunning: false,
    gameLength: gameLength,
    bonusTime: bonusTime,
  };
}