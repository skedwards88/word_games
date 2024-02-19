import React from "react";
import {Link} from "react-router-dom";

function Palette() {
  return (
    <div className="App graduated" id="palette">
      <div id="controls">
        <Link to={`/`} id="homeButton"></Link>
      </div>
      <div className="infoText">
        {`Palette (now Lexlet) has graduated to a standalone app!\n\nYou can find it at `}
        <a href="https://lexlet.com/">lexlet.com</a>
        {` or `}
        <a href="https://play.google.com/store/apps/details?id=com.palettegame.twa">
          on the Google Play Store
        </a>
        {"."}
      </div>
    </div>
  );
}

export default Palette;
