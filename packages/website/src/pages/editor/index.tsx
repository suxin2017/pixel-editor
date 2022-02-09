import React from "react";
import { Editor } from "./components/Editor";
import {
  EditorContextProvider,
  editorStore,
  useEditorContext,
} from "@toy20/store";
import { ComponentList } from "./components/ComponentList";
import { Setting } from "./components/Setting";
import { Col, Row, Spin } from "antd";
import { ComponentTree } from "./components/ComponentTree";
import { observer } from "mobx-react-lite";

interface ISiteProps {}

const SiteMain = observer(() => {
  const { init } = useEditorContext();

  return (
    <Spin spinning={!init}>
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
    </Spin>
  );
});
export let Site: React.FC<ISiteProps> = (props) => {
  return (
    <EditorContextProvider value={editorStore}>
      <SiteMain />
    </EditorContextProvider>
  );
};
