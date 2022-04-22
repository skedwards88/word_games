import React from "react";
import "./App.css";
import Gribbles from "./gribbles/components/Gribbles";
import Thirdle from "./thirdle/components/Thirdle";
import Info from "./common/Info";

function App() {
  // home
  // gribbles
  // thirdle
  const [currentDisplay, setCurrentDisplay] = React.useState("home");

  function Home() {
    return (
      <div className="App" id="home">
        <div id="games">
          <button
            className="gameButton"
            onClick={() => setCurrentDisplay("gribbles")}
          >
            <div className="gameIcon" id="gribbles_icon"></div>
            <div>Gribbles</div>
          </button>

          <button
            className="gameButton"
            onClick={() => setCurrentDisplay("thirdle")}
          >
            <div className="gameIcon" id="thirdle_icon"></div>
            <div>Thirdle</div>
          </button>
        </div>
        <div id="controls">
          <Info
           info={<div id="info">
           {`Word Games (beta 0.0.1)\n\nMobile only. Install for offline play!\n\nWant more games?\nVisit `}
           <a href="https://skedwards88.github.io/portfolio/">CnS Games</a>
           {`\n\nThanks to `}
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
