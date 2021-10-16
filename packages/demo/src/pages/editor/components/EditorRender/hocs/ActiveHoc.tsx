import { observer } from "mobx-react-lite";
import { useEditorContext, IComponentProps } from "store";

export function ActiveHoc(Com: React.FC<IComponentProps>) {
  const ActiveWrapper: React.FC<IComponentProps> = (props) => {
    const editorStore = useEditorContext();
    const isActive = editorStore?.activeComponent?.id === props.store.id;
    return (
      <div
        data-name="active wrapper"
        style={
          { position: "relative" }
        }
        onClick={(e) => {
          e.stopPropagation();
          if (editorStore) {
            editorStore.activeComponent = props.store;
          }
        }}
      >
        {isActive && (
          <>
            <div style={{
              border: "1px solid",
              borderColor:'#348fda',
              position: "absolute",
              top: 0,left:0,right:0,bottom:0
            }}>
            </div>
          <span style={{
            position: "absolute", top: -20,
            background: '#247dc5',
            color: '#fff',
            right: 0, fontSize: 12,
            padding: "0 5px"
          }}>
            {editorStore.activeComponent?.name}
            </span>
            </>
    )
  }
  <Com
    props={props.props}
    store={props.store}
    children={props.children}
  />
      </div >
    );
};
return observer(ActiveWrapper);
}
