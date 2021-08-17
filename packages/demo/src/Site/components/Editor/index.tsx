import { observer } from "mobx-react-lite";
import { useEditorContext } from "../../../packages/editor/EditorStore";
import { EditorHistory } from "../../../packages/editor/history";
import { Button } from "../../../packages/nes/Button";
import { Col } from "../../../packages/nes/layout/Col";
import { Row } from "../../../packages/nes/layout/Row";
import {  Render } from "../EditorRender";

let Editor: React.FC = () => {
  const editorStore = useEditorContext();
  return (
    <div style={{ position: "relative" }}>
      <div
        className="nes-container with-title"
        style={{ maxWidth: 375, margin: "0 auto" }}
      >
        {editorStore.component && <Render component={editorStore.component} />}
      </div>
      <div style={{ position: "absolute", right: 0, top: 0 }}>
        <Row gutter={[0, 12]} wrapper>
          <Col span={12}>
            <Button
              onClick={() => {
                editorStore.deleteComponent();
              }}
            >
              delete
            </Button>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                EditorHistory.undo();
              }}
            >
              undo
            </Button>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                EditorHistory.redo();
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

