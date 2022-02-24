import React from "react";

export default function Info() {
  const [showInfo, setShowInfo] = React.useState(false);

  return showInfo ? (
    <div className="modal">
      <button onClick={() => setShowInfo(false)}>X</button>
      Info
    </div>
  ) : (
    <button id="infoButton" onClick={() => setShowInfo(true)}></button>
  );
}
