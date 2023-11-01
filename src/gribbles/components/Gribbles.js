import React from "react";
import { Link } from "react-router-dom";

function Gribbles() {

  return (
    <div className="App graduated">
      <div id="controls">
        <Link to={`/`} id="homeButton"></Link>
      </div>
      <div className="infoText">
        {`Gribbles has graduated to a standalone app!\n\nYou can find it `}
        <a href="https://skedwards88.github.io/gribbles/">online</a>
        {` or `}<a href="https://play.google.com/store/apps/details?id=gribbles.io.github.skedwards88.twa">on the Google Play Store</a>{'.'}
      </div>
    </div>
  );
}

export default Gribbles;
