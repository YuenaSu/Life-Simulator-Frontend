import React from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./App.css";

import PrivateRoute from "./components/general/PrivateRoute";
import Login from "./pages/Login";
import GameLanding from "./pages/GameLanding";
import Game from "./pages/Game";
import BuyProperties from "./pages/BuyProperties";
import Admin from "./pages/Admin";
import NotFound from "./components/general/NotFound";
import Register from "./pages/Register";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <GameLanding />
              </PrivateRoute>
            }
          />
          <Route
            path="/game"
            element={
              <PrivateRoute>
                <Game />
              </PrivateRoute>
            }
          />
          <Route
            path="/game/buy-properties"
            element={
              <PrivateRoute>
                <BuyProperties />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
