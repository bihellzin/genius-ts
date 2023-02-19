import React, { RefObject } from "react";
import { Color } from "../../types/color";
import styles from "./styles.module.css";

interface PieceProps {
  color: Color;
  refElement: RefObject<HTMLDivElement>;
  handleClick: (ref: React.RefObject<HTMLDivElement>) => void;
}

const Piece: React.FC<PieceProps> = React.forwardRef<
  HTMLDivElement,
  PieceProps
>(({ color, refElement, handleClick }) => {
  return (
    <div
      onClick={() => handleClick(refElement)}
      ref={refElement}
      className={`${styles.piece} ${styles[`bg${color}`]}`}
    ></div>
  );
});
export default Piece;
