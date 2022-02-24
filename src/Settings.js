import React from "react";

export default function Settings() {
  // todo allow to set grid size (4/5), min word length (>=3), timer

  // when you select grid size, it should not store grid size but should call dispatch init method

  const [showSettings, setShowSettings] = React.useState(false);

  return showSettings ? (
    <div className="modal">
      <button onClick={() => setShowSettings(false)}>X</button>
      Settings
    </div>
  ) : (
    <button id="settingsButton" onClick={() => setShowSettings(true)}></button>
  );
}
