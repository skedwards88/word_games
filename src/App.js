import React from "react";
import "./App.css";
import Info from "./common/Info";
import packageJson from "../package.json";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App" id="home">
      <div id="games">
        <Link draggable={false} to={`palette`} className="gameButton">
          <div className="gameIcon" id="palette_icon"></div>
          <div>Palette</div>
        </Link>
        <Link draggable={false}  to={`gribbles`} className="gameButton">
          <div className="gameIcon" id="gribbles_icon"></div>
          <div>Gribbles</div>
        </Link>
        <Link draggable={false}  to={`jigsaw`} className="gameButton">
          <div className="gameIcon" id="jigsaw_icon"></div>
          <div>Jigsaw</div>
        </Link>
        <Link draggable={false}  to={`crossle`} className="gameButton">
          <div className="gameIcon" id="crossle_icon"></div>
          <div>Crossle</div>
        </Link>
        <Link draggable={false}  to={`packed`} className="gameButton">
          <div className="gameIcon" id="packed_icon"></div>
          <div>Packed</div>
        </Link>
        <Link draggable={false}  to={`thirdle`} className="gameButton">
          <div className="gameIcon" id="thirdle_icon"></div>
          <div>Thirdle</div>
        </Link>
      </div>
      <div id="controls">
        <Info
          info={
            <div id="info">
              {`Word Games (version ${packageJson.version})\n\nInstall or add to home screen for offline play!\n\nWant more games?\nCheck `}
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
};

export default App;
