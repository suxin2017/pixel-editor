import React from "react";
import { Editor } from "./components/Editor";
import {
  EditorContextProvider,
  editorStore,
} from "editor";
import { Col } from "../packages/nes/layout/Col";
import { Row } from "../packages/nes/layout/Row";
import { ComponentList } from "./components/ComponentList";
import { Setting } from "./components/Setting";
interface ISiteProps {}

export const Site: React.FC<ISiteProps> = (props) => {
  return (
    <EditorContextProvider value={editorStore}>
      <Row gutter={24} style={{ marginTop: 64,padding:'24px' }}>
        <Col span={1}>
          <ComponentList />
        </Col>
        <Col flex={1}>
          <Editor />
        </Col>
        <Col span={3}>
          <Setting />
        </Col>
      </Row>
    </EditorContextProvider>
  );
};
