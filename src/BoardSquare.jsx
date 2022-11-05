import React, { useEffect, useState } from "react";
import Piece from "./Piece";
import Square from "./Square";
import { useDrop } from "react-dnd";
import { gameSubject, handleMove } from "./game";
import Promote from "./Promote";

export default function BoardSquare({ piece, black, position }) {
  const [promotion, setPromotion] = useState(null);

  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const fromPosition = item.id.split("_")[0];

      handleMove(fromPosition, position);
    },
  });

  useEffect(() => {
    const sub = gameSubject.subscribe(({ pendingPromotion }) =>
      pendingPromotion && pendingPromotion.to === position
        ? setPromotion(pendingPromotion)
        : setPromotion(null)
    );

    return () => sub.unsubscribe();
  }, []);

  return (
    <div className="board-square" ref={drop}>
      <Square black={black}>
        {promotion ? (
          <Promote promotion={promotion} />
        ) : piece ? (
          <Piece piece={piece} position={position} />
        ) : null}
      </Square>
    </div>
  );
}
