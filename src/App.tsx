import { RefObject, useEffect, useRef, useState } from "react";
import _ from "lodash";
import "./App.css";
import { Color } from "./types/color";
import Piece from "./components/Piece/Piece";

function App() {
  const [correctSequence, setCorrectSequence] = useState<
    RefObject<HTMLDivElement>[]
  >([]);
  const [userSequence, setUserSequence] = useState<
    React.RefObject<HTMLDivElement>[]
  >([]);
  const [round, setRound] = useState<number>(1);
  const [userChoice, setUserChoice] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const bluePieceRef = useRef<HTMLDivElement>(null);
  const redPieceRef = useRef<HTMLDivElement>(null);
  const greenPieceRef = useRef<HTMLDivElement>(null);
  const yellowPieceRef = useRef<HTMLDivElement>(null);

  const refereces = [bluePieceRef, redPieceRef, greenPieceRef, yellowPieceRef];

  useEffect(() => {
    animate();
  }, [correctSequence]);

  useEffect(() => {
    setUserSequence([]);
    setUserChoice(0);
    if (round > 1) createSequence();
  }, [round]);

  useEffect(() => {
    if (
      userSequence[userChoice] !== correctSequence[userChoice] &&
      userSequence.length !== 0
    ) {
      setGameFinished(true);
    }
    if (
      userSequence[userChoice] === correctSequence[userChoice] &&
      gameStarted
    ) {
      setUserChoice((prev) => prev + 1);
    }
  }, [userSequence]);

  useEffect(() => {
    userChoice === round &&
      _.isEqual(userSequence, correctSequence) &&
      setRound((prev) => prev + 1);
  }, [userChoice]);

  function animate(): void {
    correctSequence.forEach((reference, index) => {
      setTimeout(() => {
        reference.current?.classList.add("hidden");
        setTimeout(() => reference.current?.classList.remove("hidden"), 1000);
      }, (index + 1) * 1200);
    });
  }

  function createSequence(): void {
    let sequence = [];
    for (let i = 0; i < round; i++) {
      sequence.push(refereces[randomNumber(0, refereces.length)]);
    }
    setCorrectSequence(sequence);
  }

  function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function handleClick(ref: RefObject<HTMLDivElement>) {
    setUserSequence((prev) => [...prev, ref]);
  }

  function restart() {
    window.location.reload();
  }

  return (
    <div className="App">
      {!gameFinished && (
        <>
          <h1>Round: {round}</h1>
          <button
            style={{ visibility: gameStarted ? "hidden" : "unset" }}
            onClick={() => {
              createSequence();
              setGameStarted((prev) => !prev);
            }}
          >
            Start
          </button>
          <Piece
            handleClick={handleClick}
            refElement={bluePieceRef}
            color={Color.Blue}
          />
          <Piece
            handleClick={handleClick}
            refElement={greenPieceRef}
            color={Color.Green}
          />
          <Piece
            handleClick={handleClick}
            refElement={redPieceRef}
            color={Color.Red}
          />
          <Piece
            handleClick={handleClick}
            refElement={yellowPieceRef}
            color={Color.Yellow}
          />
        </>
      )}
      {gameFinished && (
        <>
          <h1>You failed</h1>
          <button onClick={restart}>Restart</button>
        </>
      )}
    </div>
  );
}

export default App;
