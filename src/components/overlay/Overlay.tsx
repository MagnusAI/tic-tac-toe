import React from "react";
import "./Overlay.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: any;
}

export default function Overlay({ children }: Props) {
  return (
    <div className="overlay">
      <div className="content-container">{children}</div>
    </div>
  );
}
