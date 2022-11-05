import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./Login";
import Home from "./Home";
import Game from "./Game.jsx";

export default function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return "Loading";
  }

  if (error) {
    return "Something went Wrong";
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game/:id">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}
