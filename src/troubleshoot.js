import React from "react";
import "./App.css";

function App() {
  function handlePointerDown(e) {
    console.log(`pointer down`);
    console.log(e.pointerId);
    console.log(e.target);
    e.target.releasePointerCapture(e.pointerId);
  }
  function handlePointerMove(e) {
    console.log("move");
  }

  function handlePointerEnterStateChange(e, state) {
    // e.preventDefault();
    console.log(`pointer enter`);
    console.log(e.pointerId);
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch (error) {
      console.log(`'error 1 ${e.pointerId}'`);
    }
    try {
      e.target.releasePointerCapture(state.pointerId);
    } catch (error) {
      console.log(`'error 2' ${state.pointerId}`);
    }
    try {
      e.target.releasePointerCapture(state.pointerId + 1);
    } catch (error) {
      console.log(`'error 3 ${e.pointerId + 1}'`);
    }

    dispatch({ type: "state-change", pointerId: e.pointerId });
  }

  function handlePointerEnterNoStateChange(e) {
    // e.preventDefault();
    console.log(`pointer enter`);
    console.log(e.pointerId);
    console.log(e.target);
    dispatch({ type: "no-state-change" });
  }

  function init(initialCount) {
    return { pointerId: 0 };
  }

  function reducer(state, action) {
    console.log("in reducer");
    console.log(action);
    switch (action.type) {
      case "no-state-change":
        return state;
      case "state-change":
        return { pointerId: action.pointerId };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = React.useReducer(reducer, 3, init);

  function ComponentNoStateChange() {
    console.log("render component");

    return (
      <div
        className="letter"
        key="2"
        onPointerDown={(e) => handlePointerDown(e)}
        onPointerEnter={(e) => handlePointerEnterNoStateChange(e)}
      >
        Component div with no state change
      </div>
    );
  }

  function NestedComponentStateChange() {
    console.log("render component");
    return (
      <div>
        <div
          className="letter"
          key="3"
          onPointerDown={(e) => handlePointerDown(e)}
          onPointerEnter={(e) => handlePointerEnterStateChange(e)}
        >
          Nested component div with state change
        </div>
      </div>
    );
  }

  function ComponentStateChange({ state }) {
    console.log("render component");
    return (
      <div
        className="letter"
        key="3"
        onPointerDown={(e) => handlePointerDown(e)}
        onPointerEnter={(e) => handlePointerEnterStateChange(e, state)}
        onPointerMove={(e) => handlePointerMove(e)}
      >
        Component div with state change
      </div>
    );
  }
  console.log("render app");
  return (
    <div className="App">
      <div
        className="letter"
        key="1"
        onPointerDown={(e) => handlePointerDown(e)}
        onPointerEnter={(e) => handlePointerEnterNoStateChange(e)}
      >
        Regular div no state change
      </div>
      <div
        className="letter"
        key="4"
        onPointerDown={(e) => handlePointerDown(e)}
        onPointerEnter={(e) => handlePointerEnterStateChange(e)}
      >
        Regular div state change
      </div>

      <ComponentNoStateChange />
      <ComponentStateChange state={state}></ComponentStateChange>
      <NestedComponentStateChange />
      <div>
        <div
          className="letter"
          key="5"
          onPointerDown={(e) => handlePointerDown(e)}
          onPointerEnter={(e) => handlePointerEnterNoStateChange(e)}
        >
          Regular nested div no state change
        </div>
        <div
          className="letter"
          key="6"
          onPointerDown={(e) => handlePointerDown(e)}
          onPointerEnter={(e) => handlePointerEnterStateChange(e)}
        >
          Regular nested div state change
        </div>
      </div>
    </div>
  );
}

// function App() {
//   const letterDistribution = {
//     4: [[""]],
//     5: [],
//   };

//   function getLetters(numLetters) {
//     // todo
//     return [
//       "A",
//       "B",
//       "C",
//       "D",
//       "E",
//       "F",
//       "G",
//       "H",
//       "I",
//       "J",
//       "K",
//       "L",
//       "M",
//       "N",
//       "O",
//       "P",
//     ];
//   }

//   function getInitialSetup(numLetters) {
//     const letters = getLetters(numLetters);
//     const letterAvailabilities = letters.map((letter) => false);
//     return {
//       foundWords: [],
//       currentWord: "",
//       score: 0,
//       letters: letters,
//       letterAvailabilities: letterAvailabilities,
//     };
//   }

//   function reducer(currentState, payload) {
//     // todo
//     if (payload.action === "test") {
//       console.log(('wtf test'))
//       return {...currentState}
//       // return currentState
//     }
//     if (payload.action === "addLetter") {
//       const newWord = (currentState.currentWord += payload.letter);
//       let newLetterAvailabilities = [...currentState.letterAvailabilities];
//       newLetterAvailabilities[payload.letterIndex] = false;
//       return {
//         ...currentState,
//         currentWord: newWord,
//         letterAvailabilities: newLetterAvailabilities,
//       };
//     }
//   }

//   const [gameState, dispatchGameState] = React.useReducer(
//     reducer,
//     4,
//     getInitialSetup
//   );

//   function handlePointerDown(e, info) {
//     console.log(`pointer down ${info}`);
//     console.log(e)
//     e.target.releasePointerCapture(e.pointerId);
//   }

//   function myf(){
//     console.log('wtf')
//     dispatchGameState({
//       action: "test"
//     });
//   }

//   function handlePointerEnter(e, letter, index) {
//     e.preventDefault(); // todo do you always do this?
//     e.target.releasePointerCapture(e.pointerId);

//     console.log(`pointer enter ${letter}`);
//     // Add the letter to the list of letters
//     // dispatchGameState({
//     //   action: "addLetter",
//     //   letter: letter,
//     //   letterIndex: index,
//     // });
//     // change the style to indicate that letter can't be used again
//     myf()
//   }

//   function handlePointerUp() {
//     // Check if the list of letters is a valid word
//     // If yes, add the word to the list of words
//     // If no, indicate that invalid
//     // clear the letter list
//     // reset the letter styling (or maybe happens automatically)?
//   }

//   function Settings() {
//     // when you select grid size, it should not store grid size but should instead set the letter state
//     return <div>Settings</div>;
//   }

//   function Letter({ letter, index }) {
//     // Cares about whether letter is disabled or not (just remove pointer enter event if disabled)
//     return (
//       <div
//         className="letter"
//         key={index.toString()}
//         onPointerDown={(e) => handlePointerDown(e, "let2")}
//         onPointerEnter={(e) => handlePointerEnter(e, letter, index)}
//         onPointerUp={() => handlePointerUp()}
//       >
//         {letter}
//       </div>
//     );
//   }

//   function Board({ letters }) {
//     // cares about what letters are disabled to pass it down
//     const board = letters.map((letter, index) => (
//       <Letter letter={letter} index={index}></Letter>
//     ));
//     return <div id="board" onPointerDown={(e) => handlePointerDown(e, "b2")}
//     >{board}</div>;
//   }

//   function Score() {
//     return <div>Score</div>;
//   }

//   function FoundWords() {
//     return <div>Found</div>;
//   }

//   const letters = [
//     "A",
//     "B",
//     "C",
//     "D",
//     "E",
//     "F",
//     "G",
//     "H",
//     "I",
//     "J",
//     "K",
//     "L",
//     "M",
//     "N",
//     "O",
//     "P",
//   ];

//   // [{letter: "A", disabled: false}]

// //   return (
// //     <div className="App" onPointerDown={(e) => handlePointerDown(e, "app")}
// //     >
// //       <Score />
// //       <FoundWords />
// //       <Settings />
// //       <Board letters={letters} onPointerDown={(e) => handlePointerDown(e, "board")}
// // ></Board>
// //     </div>
// //   );
// return (
//   <div className="App"
//   >
//     <div>
//       <div>NOT POINTER</div>
// <div
//         className="letter"
//         key="1"
//         onPointerDown={(e) => handlePointerDown(e, "letter")}
//         onPointerEnter={(e) => handlePointerEnter(e, "a", 1)}
//         onPointerUp={() => handlePointerUp()}
//       >
//         A
//       </div>
//       <div
//         className="letter"
//         key="2"
//         onPointerDown={(e) => handlePointerDown(e, "letter")}
//         onPointerEnter={(e) => handlePointerEnter(e, "b", 1)}
//         onPointerUp={() => handlePointerUp()}
//       >
//         B
//       </div>
//       <Letter letter="C" index="3"></Letter>
//       </div>
//   </div>
// );

// }
export default App;
