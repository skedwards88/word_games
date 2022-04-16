import React from "react";
import "./App.css";
import Gribbles from "./gribbles/Gribbles";
import Info from "./Info";
import Thirdle from "./thirdle/thirdle";

function App() {

  // home
  // gribbles
  // thirdle
  // info
  const [currentDisplay, setCurrentDisplay] = React.useState("thirdle")

  function Home() {
    return <div className="App">
      <div  id="home">
      <button className="gameButton" onClick={() => setCurrentDisplay("gribbles")}>
        <div className="gameIcon" id="gribbles_icon"></div>
        <div>Gribbles</div>
      </button>

      <button className="gameButton" onClick={() => setCurrentDisplay("thirdle")}>
        <div className="gameIcon" id="thirdle_icon"></div>
        <div>Thirdle</div>
      </button>
      </div>
      <div id="controls">
        <button id="infoButton" onClick={() => setCurrentDisplay("info")}>
        </button>
      </div>
    </div>
  }

  switch (currentDisplay) {
    case "home":
      return (
        <Home />
      );
    case "info":
      return (
        <Info
          setCurrentDisplay={setCurrentDisplay}
        />
      );
    case "gribbles":
      return (
        <Gribbles
          setCurrentDisplay={setCurrentDisplay}
        />
      );
    case "thirdle":
      return (
        <Thirdle
        setCurrentDisplay={setCurrentDisplay}
        />
      );
    default:
      return (
        <Home />
      );
  }
}

export default App;
