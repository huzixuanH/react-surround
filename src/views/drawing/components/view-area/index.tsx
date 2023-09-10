import "./index.less";

function ViewArea() {
  return (
    <div className="view-area">
      <div className="drawing">
        <div
          className="drawing-board"
          style={{ backgroundColor: "#fff", height: 1000, width: 1500 }}
        >
          <span>666</span>
        </div>
      </div>
    </div>
  );
}

export default ViewArea;
