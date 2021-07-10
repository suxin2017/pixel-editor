import React from "react";
import { Editor } from "./components/Editor";
import {
  EditorContextProvider,
  editorStore,
} from "../packages/editor/EditorStore";
import { Col } from "../packages/nes/layout/Col";
import { Row } from "../packages/nes/layout/Row";
import { ComponentList } from "./components/ComponentList";
import { Setting } from "./components/Setting";
import { History } from "../packages/editor/history";
import { Button } from "../packages/nes/Button";

interface ISiteProps {}

export const Site: React.FC<ISiteProps> = (props) => {
  return (
    <EditorContextProvider value={editorStore}>
      <Row gutter={24}>
        <Col span={2}>
          <ComponentList />
        </Col>
        <Col flex={1}>
          <Editor />
        </Col>
        <Col span={3}>
          <Setting />
        </Col>
      </Row>
      <Button
        onClick={() => {
          History.undo();
        }}
      >
        undo
      </Button>
      <Button
        onClick={() => {
          History.redo();
        }}
      >
        redo
      </Button>
    </EditorContextProvider>
  );
};
