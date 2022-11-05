import { signInAnonymously } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";

export default function Login() {
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("username", name);

    await signInAnonymously(auth);
  }

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center", color: "white", fontSize: 24 }}>
          Enter Name
        </h1>
        <br />
        <div className="field">
          <p className="control">
            <input
              type="text"
              name="name"
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ marginBottom: 10 }}
            />
          </p>
          <div className="field">
            <p className="control">
              <button
                className="button "
                type="submit"
                style={{ width: "100%" }}
              >
                Proceed
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
