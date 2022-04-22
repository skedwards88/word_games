import React from "react";
import "./App.css";
import Gribbles from "./gribbles/components/Gribbles";
import Thirdle from "./thirdle/components/Thirdle";
import Info from "./common/Info";

const games = {
  Home: "home",
  Gribbles: "gribbles",
  Thirdle: "thirdle",
}

function App() {
  const [currentDisplay, setCurrentDisplay] = React.useState(games.Home);

  function Home() {
    return (
      <div className="App" id="home">
        <div id="games">
          <button
            className="gameButton"
            onClick={() => setCurrentDisplay(games.Gribbles)}
          >
            <div className="gameIcon" id="gribbles_icon"></div>
            <div>Gribbles</div>
          </button>

          <button
            className="gameButton"
            onClick={() => setCurrentDisplay(games.Home)}
          >
            <div className="gameIcon" id="thirdle_icon"></div>
            <div>Thirdle</div>
          </button>
        </div>
        <div id="controls">
          <Info
           info={<div id="info">
           {`Word Games (beta 0.0.1)\n\nMobile only. Install for offline play!\n\nWant more games?\nCheck `}
           <a href="https://skedwards88.github.io/portfolio/">these</a>
           {` out.\n\nThanks to `}
           <a href="https://github.com/wordnik/wordlist">Wordnik</a>
           {` for their open source word list.`}
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
