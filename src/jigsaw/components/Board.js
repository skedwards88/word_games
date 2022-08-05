import React from "react";
import { dragToken } from "./Jigsaw";
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

// function CanvasPiece({ letters, index,x, y,  }) {

//   return <canvas
//     id="boardCanvas"// changed
//     width="900px" //todo how to handle size when multiple pieces locked
//     height="900px"
//     key={index}
//     draggable
//     // data-pool-position={index} // -> removed
//         style={{ // added
//         "--x": `${x}%`,
//         "--y": `${y}%`,
//       }}
//     onDragStart={(event) =>
//       dragToken({
//         event: event,
//         letter: letters,
//         index: index,
//         dragArea: "board", // -> changed
//       })
//     }
//     onDragEnd={(event) => event.target.classList.remove("dragging")}
//   ></canvas>
// }

// export default function Board({ pieces, dropToken }) {
  
//   const myRef = React.useRef();
  
//   React.useEffect(() => {
//     const canvases = myRef.current.children
//     for (let index = 0; index < canvases.length; index++) {
//       const canvasElement= canvases[index];
//       const context = canvasElement.getContext('2d');
//       context.textBaseline = "middle";
//       context.font = '300px sans-serif';
//       context.fillStyle = "#ffffff";
//       context.textAlign = "center";

//       const letters = pieces[index].letters;
//       for (let rowIndex = 0; rowIndex < letters.length; rowIndex++) {
//         for (let colIndex = 0; colIndex < letters[rowIndex].length; colIndex++) {
//           if (letters[rowIndex][colIndex]) {
//             const x = 150 + (300 * colIndex)
//             const y = 150 + (300 * rowIndex)
//             context.fillStyle = "#00ff00";
//             context.fillRect(x - 150, y - 150, 300, 300);

//             context.fillStyle = "#0000ff";
//             context.fillText(letters[rowIndex][colIndex], x, y);
//           }
//         }
//       }
//     }
//   },[pieces])

//   const board = pieces.map((piece, index) =>
//   CanvasPiece({ letters: piece.letters, x: piece.x, y: piece.y, index: index })
//   );

//   return (
//     <div
//       id="board"
//       ref={myRef}
//       onDragOver={(event) => {
//         event.preventDefault();
//       }}
//       onDrop={(event) => dropToken({ event: event })}
//       onDragEnter={(event) => {
//         event.preventDefault();
//       }}
//     >
//       {board}
//     </div>
//   );
// }

export default function Board({ board, handleBoardDragEnter, handleBoardDrop }) {
  // 
  const gridSize = 9; // todo get, and build grid smarter
  let grid = [
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null]
];

  for (let index = 0; index < board.length; index++) {
    const letters = board[index].letters;
    let top = board[index].top;
    for (let rowIndex = 0; rowIndex < letters.length; rowIndex++) {
      let left = board[index].left;
      for (let colIndex = 0; colIndex < letters[rowIndex].length; colIndex++) {
        if (letters[rowIndex][colIndex]) {
          grid[top][left] = {
          letter: letters[rowIndex][colIndex],
          dragIndex: index,
          relativeTop: rowIndex,
          relativeLeft: colIndex,
        }; /// todo handle the case where something already there //todo handle case where off grid

        }
        left += 1;
      }
      top += 1;
    }
  }

  let boardElements = []
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
      const element = grid[rowIndex][colIndex]?.letter ? <div
      className="boardLetter"
      key={`${rowIndex}-${colIndex}`}
      draggable
      onDragStart={(event) =>
        dragToken({
          event: event,
          letter: grid[rowIndex][colIndex]?.letter,
          rowIndex: rowIndex,
          colIndex: colIndex,
          dragArea: "board",

          dragIndex: grid[rowIndex][colIndex]?.dragIndex,
          relativeTop: grid[rowIndex][colIndex]?.relativeTop,
          relativeLeft: grid[rowIndex][colIndex]?.relativeLeft,
        })
      }
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => handleBoardDrop({event: event})}
      // onDragEnd={(event) => handleBoardDragEnd({event: event})}
        onDragEnter={(event) => {
        handleBoardDragEnter({ event: event, rowIndex: rowIndex,
          colIndex: colIndex });
      }}
    >{grid[rowIndex][colIndex]?.letter}</div> : <div 
    className="boardLetter" 
    key={`${rowIndex}-${colIndex}`}
    onDragOver={(event) => {
      event.preventDefault();
    }}
    onDrop={(event) => handleBoardDrop({event: event})}
    // onDragEnd={(event) => handleBoardDragEnd({event: event})}
    onDragEnter={(event) => {
      handleBoardDragEnter({ event: event, rowIndex: rowIndex,
        colIndex: colIndex });
    }}
  >{""}</div> //todo make blank spaces draggable?
    boardElements.push(element)
    }
  }

  return <div id="board">{boardElements}</div>;
}