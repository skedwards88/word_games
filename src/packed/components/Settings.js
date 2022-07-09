import React from "react";

export default function Settings({ dispatchGameState, gameState }) {
  const [showSettings, setShowSettings] = React.useState(false);

  function handleShowSettings() {
    setShowSettings(!showSettings);
  }

  function handleNewGame(event) {
    event.preventDefault();
    const newGridSize = parseInt(event.target.elements.gridSize.value);

    dispatchGameState({
      action: "newGame",
      gridSize: newGridSize,
    });
    setShowSettings(false);
  }

  return showSettings ? (
    <form className="modal" onSubmit={(e) => handleNewGame(e)}>
      <div id="settings">
        <div className="setting">
          <div className="setting-description">
            <label htmlFor="gridSize">Grid size</label>
          </div>
          <select
            id="gridSize"
            defaultValue={Math.sqrt(gameState.solution.length)}
          >
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
      <div id="setting-buttons">
        <button type="submit" aria-label="new game">
          New Game
        </button>
        <button
          type="button"
          aria-label="cancel"
          onClick={() => handleShowSettings()}
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <button id="settingsButton" onClick={() => handleShowSettings()}></button>
  );
}
