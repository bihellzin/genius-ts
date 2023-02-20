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
>(({ color, refElement, handleClick }, _ref) => {
  const animatePiece = () => {
    refElement.current?.classList.add("shinefaster");
    setTimeout(() => refElement.current?.classList.remove("shinefaster"), 500);
  };

  return (
    <div
      onClick={() => handleClick(refElement)}
      onTouchStart={animatePiece}
      ref={refElement}
      className={`${styles.piece} ${styles[`${color}piece`]}`}
    ></div>
  );
});
export default Piece;
