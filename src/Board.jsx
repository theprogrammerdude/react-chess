import React from "react";
import BoardSquare from "./BoardSquare";

export default function Board({ board }) {
  function getXY(i) {
    const x = i % 8;
    const y = Math.abs(Math.floor(i / 8) - 7);

    return { x, y };
  }

  function isBlack(i) {
    const { x, y } = getXY(i);

    return (x + y) % 2 === 1 ? true : false;
  }

  function getPosition(i) {
    const { x, y } = getXY(i);
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];

    return `${letter}${y + 1}`;
  }

  return (
    <div className="board">
      {board.flat().map((piece, i) => (
        <div key={i} className="square">
          <BoardSquare
            piece={piece}
            black={isBlack(i)}
            position={getPosition(i)}
          />
        </div>
      ))}
    </div>
  );
}
