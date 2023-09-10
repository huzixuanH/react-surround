import "./index.less";
import ViewArea from "@/views/drawing/components/view-area";
import PropertiesPanel from "@/views/drawing/components/properties-panel";

function Drawing() {
  return (
    <div className="drawing-root">
      <ViewArea />
      <PropertiesPanel />
    </div>
  );
}

export default Drawing;
