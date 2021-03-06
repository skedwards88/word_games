import React from "react";
import "./App.css";
import Gribbles from "./gribbles/components/Gribbles";
import Thirdle from "./thirdle/components/Thirdle";
import Palette from "./palette/components/Palette";
import Packed from "./packed/components/Packed";
import Crossle from "./crossle/components/Crossle";
import Info from "./common/Info";
import { gameIndex } from "./gameIndex";
import packageJson from "../package.json";

function App() {
  const [currentDisplay, setCurrentDisplay] = React.useState(gameIndex.Home);

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

          <button
            className="gameButton"
            onClick={() => setCurrentDisplay(gameIndex.Palette)}
          >
            <div className="gameIcon" id="palette_icon"></div>
            <div>Palette</div>
          </button>

          <button
            className="gameButton"
            onClick={() => setCurrentDisplay(gameIndex.Packed)}
          >
            <div className="gameIcon" id="packed_icon"></div>
            <div>Packed</div>
          </button>

          <button
            className="gameButton"
            onClick={() => setCurrentDisplay(gameIndex.Crossle)}
          >
            <div className="gameIcon" id="crossle_icon"></div>
            <div>Crossle</div>
          </button>
        </div>
        <div id="controls">
          <Info
            info={
              <div id="info">
                {`Word Games (beta ${packageJson.version})\n\nMobile only. Install or add to home screen for offline play!\n\nWant more games?\nCheck `}
                <a href="https://skedwards88.github.io/portfolio/">these</a>
                {` out. `}
                {<hr></hr>}
                {`Thanks to `}
                <a href="https://github.com/wordnik/wordlist">Wordnik</a>
                {` for their open source word list and `}
                <a href="https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists#English">
                  Wiktionary
                </a>
                {` and data therein for word frequency data.`}
              </div>
            }
          />
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
    case "palette":
      return <Palette setCurrentDisplay={setCurrentDisplay} />;
    case "packed":
      return <Packed setCurrentDisplay={setCurrentDisplay} />;
    case "crossle":
      return <Crossle setCurrentDisplay={setCurrentDisplay} />;
    default:
      return <Home />;
  }
}

export default App;
