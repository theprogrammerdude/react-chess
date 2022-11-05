import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import Board from "./Board";
import { gameSubject, initGame, newGame } from "./game";

function Game() {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState();
  const [result, setResult] = useState();
  const { id } = useParams();

  useEffect(() => {
    initGame(getDoc(doc(db, "games", id)));
    const sub = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setGameOver(game.gameOver);
      setResult(game.result);
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <div className="app-container">
      {gameOver && (
        <h2 className="vertical-text">
          GAME OVER
          <button onClick={() => newGame()}>
            <span className="vertical-text">RESET</span>
          </button>
        </h2>
      )}
      <div className="vertical-text">
        <button onClick={() => newGame()}>
          <span className="vertical-text">NEW GAME</span>
        </button>
      </div>
      <div className="board-app-container">
        <Board board={board}></Board>
      </div>

      {result && <p className="vertical-text">{result}</p>}
    </div>
  );
}

export default Game;
