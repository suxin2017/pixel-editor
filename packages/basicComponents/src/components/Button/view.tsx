import { observer } from "mobx-react-lite";
import { AddStore, IAddStoreProps } from "./store";
import { IComponent } from "@toy20/store";

let Button: IComponent<IAddStoreProps, AddStore> = ({
  props,
  children,
  store,
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <button
        style={{ ...props.style }}
        onClick={() => {
          console.log("download app");
        }}
      >
        remote button
        {props.value}
      </button>
    </div>
  );
};
Button = observer(Button);

export { Button };
