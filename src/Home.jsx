import React, { useState } from "react";
import { auth, db } from "./firebase";
import uuid from "react-uuid";
import { doc, setDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";

export default function Home() {
  const { currentUser } = auth;
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const newGameOptions = [
    { label: "BLACK", value: "b" },
    { label: "WHITE", value: "w" },
    { label: "RANDOM", value: "r" },
  ];

  async function startOnlineGame(startingPiece) {
    const user = {
      uid: currentUser.uid,
      piece:
        startingPiece === "r"
          ? ["b", "w"][Math.round(Math.random())]
          : startingPiece,
      name: localStorage.getItem("username"),
      creator: true,
    };

    const game = {
      status: "waiting",
      members: [user],
      gameId: uuid(),
    };

    await setDoc(doc(db, "games", game.gameId), game)
      .then((data) => console.log(data))
      .catch((e) => console.error(e));

    history.push(`/game/${game.gameId}`);
  }

  return (
    <>
      <div className="app-container">
        <button className="button" onClick={() => setShowModal(true)}>
          Play Online
        </button>
      </div>
      <div className={`modal ${showModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="model-content">
          <div className="card">
            <div className="card-content">
              Please select the piece you want to play
            </div>
            <div className="card-footer">
              {newGameOptions.map(({ label, value }) => (
                <span
                  className="card-footer-item"
                  key={value}
                  style={{ cursor: "pointer" }}
                  onClick={() => startOnlineGame(value)}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button
          className="modal-close is-large"
          onClick={() => setShowModal(false)}
        ></button>
      </div>
    </>
  );
}
