import React from "react";
import {sortMethods} from "../../common/sortLetters";

export default function Settings({dispatchGameState, gameState}) {
  const [showSettings, setShowSettings] = React.useState(false);

  function handleShowSettings() {
    setShowSettings(!showSettings);
  }

  function handleNewGame(event) {
    event.preventDefault();
    const newSortBy = event.target.elements.sortBy.value;

    dispatchGameState({
      action: "newGame",
      sortBy: newSortBy,
    });
    setShowSettings(false);
  }

  return showSettings ? (
    <form className="modal" onSubmit={(e) => handleNewGame(e)}>
      <div id="settings">
        <div className="setting">
          <div className="setting-description">
            <label htmlFor="sortBy">Sort</label>
          </div>
          <select id="sortBy" defaultValue={gameState.sortBy ?? "None"}>
            <option value={sortMethods.Alphabetical}>
              {sortMethods.Alphabetical}
            </option>
            <option value={sortMethods.Vowels}>{sortMethods.Vowels}</option>
            <option value={sortMethods.None}>{sortMethods.None}</option>
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
