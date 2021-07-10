import React from "react";
import Add from "../../../components/Add";
import { useEditorContext } from "../../../packages/editor/EditorStore";
import { Col } from "../../../packages/nes/layout/Col";
import { Row } from "../../../packages/nes/layout/Row";

interface IComponentListProps {}

export const ComponentList: React.FC<IComponentListProps> = (props) => {
  const editorStore = useEditorContext();
  return (
    <div className="nes-container with-title is-centered">
      Click Add Component
      <Row
        wrapper
        justify="center"
        onClick={() => {
          editorStore.addComponentToRoot(Add);
        }}
      >
        <Col span={12}>{Add.icon}</Col>
        <Col span={12} style={{ textAlign: "center" }} flex={1}>
          {Add.name}
        </Col>
      </Row>
    </div>
  );
};
