import { observer } from "mobx-react-lite";
import { IComponentProps } from "@toy20/render";
import { useDrag } from "./useDragHook";

export function DraggableHoc(Com: React.FC<IComponentProps>) {
  const DraggableWrapper: React.FC<IComponentProps> = (props) => {
    const draggableHandle = useDrag({
      onChange: () => {},
    });
    return (
      <div data-id={props.store.id} data-type={props.store.type} draggable {...draggableHandle}>
        <Com
          props={props.props}
          store={props.store}
          children={props.children}
        />
      </div>
    );
  };
  return observer(DraggableWrapper);
}
