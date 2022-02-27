import words from "./temp";

const che = words.has("a");
console.log(che);

const ze = words.has("ab");
console.log(ze);

function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function TimerNew() {
  const [timeRemaining, setTimeRemaining] = React.useState(60);
  const [isRunning, setIsRunning] = React.useState(true);

  useInterval(() => {
    setTimeRemaining(timeRemaining - 1);
  }, 1000);

  let display;
  if (timeRemaining > 0) {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    display = `${minutes}:${displaySeconds}`;
  } else {
    display = "GAME OVER";
  }

  return <div>{display}</div>;
}
