import { Col, Row } from "antd";
import React from "react";

import { useEditorContext } from "@toy20/store";
import { observer } from "mobx-react-lite";

interface IComponentListProps {}

let ComponentList: React.FC<IComponentListProps> = (props) => {
  const editorStore = useEditorContext();
  return (
    <div>
      {editorStore.init && editorStore.componentList?.getAllComponent().map((component) => {
        return (
          <Row
            key={component.name}
            align="middle"
            justify="center"
            style={{ padding: "8px" }}
            onClick={() => {
              const targetComponent =
                editorStore.componentList?.getEditorComponent(component.name);
              console.log(targetComponent);
              
              if (targetComponent) {
                editorStore.addComponentToNearParentComponent(targetComponent);
              }
            }}
          >
            <Col span={24}>
              <div style={{ textAlign: "center" }}>{component.icon}</div>
            </Col>
            <Col span={24} style={{ textAlign: "center" }}>
              {component.name}
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

ComponentList = observer(ComponentList);
export { ComponentList };
