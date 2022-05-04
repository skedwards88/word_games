import React from "react";
import "./App.css";
import Gribbles from "./gribbles/components/Gribbles";
import Thirdle from "./thirdle/components/Thirdle";
import Info from "./common/Info";
import { gameIndex } from "./gameIndex";

function App() {
  const [currentDisplay, setCurrentDisplay] = React.useState(gameIndex.Home);  

  function handleResize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () =>
      removeEventListener("resize", handleResize);
  });

  function Home() {
    return (
      <div className="App" id="home">
        <div id="games">
          <button
            className="gameButton"
            onClick={() => setCurrentDisplay(gameIndex.Gribbles)}
          >
            <div className="gameIcon" id="gribbles_icon"></div>
            <div>Gribbles</div>
          </button>

          <button
            className="gameButton"
            onClick={() => setCurrentDisplay(gameIndex.Thirdle)}
          >
            <div className="gameIcon" id="thirdle_icon"></div>
            <div>Thirdle</div>
          </button>
        </div>
        <div id="controls">
          <Info
           info={<div id="info">
           {`Word Games (beta 0.0.7)\n\nMobile only. Install or add to home screen for offline play!\n\nWant more games?\nCheck `}
           <a href="https://skedwards88.github.io/portfolio/">these</a>
           {` out. `}
           {<hr></hr>}
           {`Thanks to `}
           <a href="https://github.com/wordnik/wordlist">Wordnik</a>
           {` for their open source word list and `}
           <a href="https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists#English">Wiktionary</a>
           {` and data therein for word frequency data.`}
         </div>}/>
        </div>
      </div>
    );
  }

  switch (currentDisplay) {
    case "home":
      return <Home />;
    case "gribbles":
      return <Gribbles setCurrentDisplay={setCurrentDisplay} />;
    case "thirdle":
      return <Thirdle setCurrentDisplay={setCurrentDisplay} />;
    default:
      return <Home />;
  }
}

export default App;
