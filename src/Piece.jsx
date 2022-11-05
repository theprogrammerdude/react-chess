import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";

export default function Piece({ piece: { type, color }, position }) {
  const [{ opacity }, drag, preview] = useDrag({
    item: { type: "piece", id: `${position}_ ${type}_${color}` },
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0 : 1,
      };
    },
  });

  const pieceAsset = require(`./assets/${type}_${color}.png`);

  return (
    <>
      <DragPreviewImage connect={preview} src={pieceAsset} />
      <div className="piece-app-container" ref={drag} style={{ opacity }}>
        <img src={pieceAsset} alt="" className="piece" />
      </div>
    </>
  );
}
