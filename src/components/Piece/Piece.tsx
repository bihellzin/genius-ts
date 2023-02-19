import React from 'react';
import { Color } from '../../types/color';
import styles from './styles.module.css';

interface PieceProps {
  color: Color;
  refElement: React.RefObject<HTMLDivElement>;
  handleClick: any;
}

const Piece: React.FC<PieceProps> = React.forwardRef<
  HTMLDivElement,
  PieceProps
>(({ color, refElement, handleClick }, ref) => {
  return (
    <div
      onClick={() => handleClick(refElement)}
      ref={refElement}
      className={`${styles.piece} ${styles[`bg${color}`]}`}
    ></div>
  );
});
export default Piece;
