import Moveable from "react-moveable";
import { useRef } from "react";

function Drawing() {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div>
        <div style={{ width: 100 }} ref={targetRef}>
          Target
        </div>
        <Moveable
          target={targetRef}
          draggable={true}
          throttleDrag={1}
          edgeDraggable={false}
          startDragRotate={0}
          throttleDragRotate={0}
          onDrag={(e) => {
            e.target.style.transform = e.transform;
          }}
        />
      </div>
    </div>
  );
}

export default Drawing;
