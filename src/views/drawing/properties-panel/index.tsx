import "./index.less";
import { RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Button } from "antd";

function PropertiesPanel() {
  const [collapsedPanel, setCollapsedPanel] = useState(true);

  const btnOnClick = () => {
    setCollapsedPanel(!collapsedPanel);
  };

  return (
    <>
      <div className="properties-panel">
        <Button
          className="btn"
          type="link"
          onClick={btnOnClick}
          size="small"
          icon={<RightOutlined rotate={collapsedPanel ? 0 : 180} />}
        />
        {collapsedPanel && <div className="panel-content">122</div>}
      </div>
    </>
  );
}

export default PropertiesPanel;
