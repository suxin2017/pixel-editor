import React from "react";
import { Editor } from "./components/Editor";
import {
  EditorContextProvider,
  editorStore,
} from "store";
import { ComponentList } from "./components/ComponentList";
import { Setting } from "./components/Setting";
import { Col, Row } from "antd";
import { ComponentTree } from "./components/ComponentTree";

interface ISiteProps { }

export const Site: React.FC<ISiteProps> = (props) => {
  return (
    <EditorContextProvider value={editorStore}>
      <Row gutter={24}>
        <Col>
          <Row>
            <Col>
              <ComponentList />
            </Col>
            <Col span={24}>
              <ComponentTree />
            </Col>
          </Row>
        </Col>
        <Col flex={1}>
          <Editor />
        </Col>
        <Col>
          <Setting />
        </Col>
      </Row>
    </EditorContextProvider>
  );
};
