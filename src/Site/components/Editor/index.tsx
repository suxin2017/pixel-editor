import { observer } from "mobx-react-lite";
import {
  useEditorContext,
} from "../../../packages/editor/EditorStore";
import { Render } from "../EditorRender";

let Editor: React.FC = () => {
  const editorStore = useEditorContext();
  return (
    <div>
      {editorStore.component && <Render component={editorStore.component} />}
    </div>
  );
};
Editor = observer(Editor);
export { Editor };
