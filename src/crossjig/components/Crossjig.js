import React from "react";
import { Link } from "react-router-dom";

function Crossjig() {
  return (
    <div className="App graduated" id="crossjig">
      <div id="controls">
        <Link to={`/`} id="homeButton"></Link>
      </div>
      <div className="infoText">
        {`Crossjig has graduated to a standalone app!\n\nYou can find it at `}
        <a href="https://crossjig.com/">crossjig.com</a>
        {` or `}
        <a href="https://play.google.com/store/apps/details?id=com.crossjig.twa">
          on the Google Play Store
        </a>
        {"."}
      </div>
    </div>
  );
}

export default Crossjig;
