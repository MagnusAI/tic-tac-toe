import React, { useState, useEffect } from "react";
import Tile from "../tile/Tile";
import Token from "../token/Token";
import "./Gameboard.css";
import Gameover from "../gameover/Gameover";

interface Props {
  children?: any;
}

const emptyBoard = Array.from({ length: 9 }, (_) => 0);

export default function Gameboard({ children }: Props) {
  const [state, setState] = useState(emptyBoard);
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState();

  useEffect(() => {
    if (isTerminal()) {
      const prevPlayer = changePlayer();
      setWinner(prevPlayer);
    } else if (!state.includes(0)) {
      setWinner("draw");
    }
  }, [state]);

  const changePlayer = (): number => {
    if (player === 1) {
      setPlayer(2);
      return 2;
    } else {
      setPlayer(1);
      return 1;
    }
  };

  const placeToken = (index: number) => {
    if (state[index] == 0 && !winner) {
      let newState = [...state];
      newState[index] = player;
      setState(newState);
      changePlayer();
    }
  };

  const playerToSymbol = (player: number): string => {
    if (player === 1) {
      return "X";
    } else if (player === 2) {
      return "O";
    } else {
      return "";
    }
  };

  const restart = () => {
    setState(emptyBoard);
    setPlayer(1);
    setWinner("");
  };

  const isTerminal = (): boolean => {
    const allEqual = (arr) => arr.every((v) => v === arr[0]);

    let topHorizontal = [state[0], state[1], state[2]];
    let midHorizontal = [state[3], state[4], state[5]];
    let botHorizontal = [state[6], state[7], state[8]];
    let leftVertical = [state[0], state[3], state[6]];
    let midVertical = [state[1], state[4], state[7]];
    let rightVertical = [state[2], state[5], state[8]];
    let rightCross = [state[2], state[4], state[6]];
    let leftCross = [state[0], state[4], state[8]];

    topHorizontal = !topHorizontal.includes(0) && allEqual(topHorizontal);
    midHorizontal = !midHorizontal.includes(0) && allEqual(midHorizontal);
    botHorizontal = !botHorizontal.includes(0) && allEqual(botHorizontal);
    leftVertical = !leftVertical.includes(0) && allEqual(leftVertical);
    midVertical = !midVertical.includes(0) && allEqual(midVertical);
    rightVertical = !rightVertical.includes(0) && allEqual(rightVertical);
    leftCross = !leftCross.includes(0) && allEqual(leftCross);
    rightCross = !rightCross.includes(0) && allEqual(rightCross);

    const threeInRow =
      leftCross ||
      rightCross ||
      topHorizontal ||
      botHorizontal ||
      midHorizontal ||
      leftVertical ||
      midVertical ||
      rightVertical;

    if (threeInRow) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="container">
      {winner && <Gameover winner={winner} restart={restart} />}
      <div className="gameboard">
        {state.map((player, i) => (
          <Tile key={`tile-${i}`} index={i} onClick={placeToken}>
            <Token
              symbol={playerToSymbol(player)}
              color={player == 1 ? "black" : "red"}
            />
          </Tile>
        ))}
      </div>
    </div>
  );
}
