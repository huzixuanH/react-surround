import "./index.less";
import ViewArea from "@/views/drawing/view-area";
import PropertiesPanel from "@/views/drawing/properties-panel";

function Drawing() {
  return (
    <div className="drawing-root">
      <ViewArea />
      <PropertiesPanel />
    </div>
  );
}

export default Drawing;
