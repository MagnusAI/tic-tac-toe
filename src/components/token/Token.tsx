import React from "react";
import "./Token.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  symbol: string;
  color?: string;
}

export default function Token({ symbol, color }: Props) {
  return (
    <div className="token" style={{ color: color }}>
      {symbol}
    </div>
  );
}
