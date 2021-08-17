import React from "react";
import {
  getAllComponent, getEditorComponent,
} from "../../../../../editor/src/componentList";
import { useEditorContext } from "editor";
import { Col } from "../../../packages/nes/layout/Col";
import { Row } from "../../../packages/nes/layout/Row";

interface IComponentListProps {}
console.log('update')

export const ComponentList: React.FC<IComponentListProps> = (props) => {
  const editorStore = useEditorContext();

  return (
    <div className="nes-container with-title is-centered">
      Components
      {getAllComponent().map((component) => {
        return (
          <Row
            wrapper
            justify="center"
            onClick={() => {
              editorStore.addComponentToNearParentComponent(getEditorComponent(component.name));
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
