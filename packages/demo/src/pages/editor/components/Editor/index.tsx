import { Button, Col, Modal, Row } from "antd";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useEditorContext, editorHistory, serializing, deserializing } from "store";
import { Render } from "../EditorRender";

let Editor: React.FC = () => {
  const editorStore = useEditorContext();

  return (
    <div style={{ position: "relative", top: 24 }}>
      <div
        style={{ maxWidth: 375, margin: "0 auto", border: '1px solid' }}
      >
        {editorStore.component && <Render component={editorStore.component} />}
      </div>
      <div style={{ position: "absolute", right: 0, top: 0 }}>
        <Row gutter={[0, 12]} >
          <Button onClick={() => {
            if (editorStore.component) {
              // console.log(JSON.stringify(serializing(editorStore.component), (k, v) => {
              //   if (k === 'parent') {
              //     return undefined
              //   }
              //   return v
              // }))
            }
          }}>
            Preview
          </Button>
          <Col span={24}>
            <Button
              onClick={() => {
                editorStore.deleteComponent();
              }}
            >
              delete
            </Button>
          </Col>
          <Col span={24}>
            <Button
              onClick={() => {
                editorHistory.undo();
              }}
            >
              undo
            </Button>
          </Col>
          <Col span={24}>
            <Button
              onClick={() => {
                editorHistory.redo();
              }}
            >
              redo
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};
Editor = observer(Editor);
export { Editor };

