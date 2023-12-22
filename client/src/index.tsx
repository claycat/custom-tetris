/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TetrisGame from "./TetrisGame";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <TetrisGame />
    </React.StrictMode>
);
