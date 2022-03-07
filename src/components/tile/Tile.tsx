import React from "react";
import "./Tile.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: any;
  index: number;
  onClick: (e: any) => void;
}

export default function Tile({ index, onClick, children }: Props) {
  return (
    <button className="tile" onClick={() => onClick(index)}>
      <div className="content">{children}</div>
    </button>
  );
}
