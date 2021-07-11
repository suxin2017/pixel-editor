import React from "react";
import {
  getAllComponent,
} from "../../../packages/editor/componentList";
import { useEditorContext } from "../../../packages/editor/EditorStore";
import { Col } from "../../../packages/nes/layout/Col";
import { Row } from "../../../packages/nes/layout/Row";

interface IComponentListProps {}

export const ComponentList: React.FC<IComponentListProps> = (props) => {
  const editorStore = useEditorContext();

  return (
    <div className="nes-container with-title is-centered">
      Click Add Component
      {getAllComponent().map((component) => {
        return (
          <Row
            wrapper
            justify="center"
            onClick={() => {
              editorStore.addComponentToNearParentComponent(component);
            }}
          >
            <Col span={12}>{component.icon}</Col>
            <Col span={12} style={{ textAlign: "center" }} flex={1}>
              {component.name}
            </Col>
          </Row>
        );
      })}
    </div>
  );
};
