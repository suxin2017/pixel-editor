import { observer } from "mobx-react-lite";
import Add from "../../../components/Add";
import Page from "../../../components/Page";
import { addEditorComponent } from "../../../packages/editor/componentList";
import {
  editorStore,
  useEditorContext,
} from "../../../packages/editor/EditorStore";
import { createRender } from "../../../packages/render";
import { IComponentProps } from "../../../packages/render/interface/IComponentProps";
console.log("hot update render");

/**
 * You need to refresh the browser if you edit this file, because EditorStores are global
 */
export const Render = createRender({
  beforeHoc() {
    addEditorComponent(Page);
    addEditorComponent(Add);
  },
  afterHoc() {
    const rootNode = editorStore.addComponentToRoot(Page);
    editorStore.activeComponent = rootNode;
  },
  hoc: [
    function ActiveHoc(Com) {
      const ActiveWrapper: React.FC<IComponentProps> = (props) => {
        const editorStore = useEditorContext();
        const isActive = editorStore?.activeComponent?.id === props.store.id;
        return (
          <div
            data-name="active wrapper"
            style={
              isActive
                ? { border: "1px solid red", position: "relative" }
                : { position: "relative" }
            }
            onClick={(e) => {
              e.stopPropagation();
              if (editorStore) {
                editorStore.activeComponent = props.store;
              }
            }}
          >
            {isActive && (
              <span style={{ position: "absolute", right: 0, fontSize: 12 }}>
                active component {editorStore.activeComponent?.name}
              </span>
            )}
            <Com
              props={props.props}
              store={props.store}
              children={props.children}
            />
          </div>
        );
      };
      return observer(ActiveWrapper);
    },
  ],
});
