import { Col, Row } from "antd";
import React from "react";

import { useEditorContext, componentList } from "store";

interface IComponentListProps { }

export const ComponentList: React.FC<IComponentListProps> = (props) => {
  const editorStore = useEditorContext();

  return (
    <div>
      {componentList.getAllComponent().map((component) => {
        return (
          <Row
            key={component.name}
            align="middle"
            justify="center"
            style={{ padding: '8px' }}
            onClick={() => {
              editorStore.addComponentToNearParentComponent(componentList.getEditorComponent(component.name));
            }}
          >
            <Col span={24}>
              <div style={{ textAlign: 'center' }}>
                {component.icon}
              </div>
            </Col>
            <Col span={24} style={{ textAlign: "center" }} >
              {component.name}
            </Col>
          </Row>
        );
      })}
    </div>
  );
};
