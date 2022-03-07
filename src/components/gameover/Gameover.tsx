import React from "react";
import Overlay from "../overlay/Overlay";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: any;
  winner: string;
  restart: () => void;
}

export default function Gameover({ winner, restart }: Props) {
  return (
    <Overlay>
      <div>
        <div style={{ padding: 16 }}>
          {winner == "draw" ? `Draw!` : `Player ${winner} won!`}
        </div>
        <button onClick={restart}>{"Play again"}</button>
      </div>
    </Overlay>
  );
}
