import React from "react";

export function initTimer({ gameLength, bonusTime }) {
  // use the specified settings, otherwise check local storage, otherwise use default
  gameLength =
    gameLength || JSON.parse(localStorage.getItem("gameLength")) || 30;
    // bonusTime can be 0, so use the nullish operator
  bonusTime =
    bonusTime ?? JSON.parse(localStorage.getItem("bonusTime")) ?? 5;
  return {
    remainingTime: gameLength,
    isRunning: false,
    gameLength: gameLength,
    bonusTime: bonusTime,
  };
}

export function timerStateReducer(currentTimerState, payload) {
  if (payload.action === "decrement") {
    const newRemainingTime = currentTimerState.remainingTime - 1;
    return {
      ...currentTimerState,
      remainingTime: newRemainingTime,
      isRunning: newRemainingTime > 0 ? currentTimerState.isRunning : false,
    };
  }
  if (payload.action === "increment") {
    const newRemainingTime = currentTimerState.remainingTime + currentTimerState.bonusTime;
    return {
      ...currentTimerState,
      remainingTime: newRemainingTime,
      isRunning: newRemainingTime > 0 ? currentTimerState.isRunning : false,
    };
  }
  if (payload.action === "reset") {
    return initTimer({ gameLength: payload.gameLength, bonusTime: payload.bonusTime });
  }
  if (payload.action === "play") {
    return { ...currentTimerState, isRunning: true };
  }
  if (payload.action === "pause") {
    return { ...currentTimerState, isRunning: false };
  }
  // todo make this an error
  console.log(`unknown ${console.log(JSON.stringify(payload))}`);
}

export function Timer({ timerState, timerDispatch }) {
  React.useEffect(() => {
    let timerID;
    if (timerState.isRunning) {
      if (timerState.remainingTime > 0) {
        timerID = setInterval(
          () => timerDispatch({ action: "decrement" }),
          1000
        );
      }
    }
    return () => clearInterval(timerID);
  }, [timerState.isRunning]);

  let display;
  if (timerState.remainingTime > 0) {
    const minutes = Math.floor(timerState.remainingTime / 60);
    const seconds = timerState.remainingTime % 60;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    display = `${minutes}:${displaySeconds}`;
  } else {
    display = "GAME OVER";
  }

  return <div>{display}</div>;
}

export function TimerBlocker({ timerState, timerDispatch }) {
  if (timerState.remainingTime <= 0) {
    return <div className="modal fadeOut">{"GAME OVER!"}</div>;
  }

  if (!timerState.isRunning) {
    const command =
      timerState.remainingTime === timerState.gameLength ? "Play" : "Resume";
    return (
      <div
        className="modal"
        onClick={() => timerDispatch({ action: "play" })}
      >{`Tap to ${command}`}</div>
    );
  }

  return <></>;
}
