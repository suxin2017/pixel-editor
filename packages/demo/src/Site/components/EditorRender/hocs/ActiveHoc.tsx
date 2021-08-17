import { observer } from "mobx-react-lite";
import { useEditorContext } from "../../../../packages/editor/EditorStore";
import { IComponentProps } from "../../../../packages/render/interface/IComponentProps";

export function ActiveHoc(Com: React.FC<IComponentProps>) {
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
}
