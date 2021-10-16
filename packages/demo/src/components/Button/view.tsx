import { observer } from "mobx-react-lite";
import { Button as NesButton } from "../../packages/nes/Button";
import { AddStore, IAddStoreProps } from "./store";
import { IComponent } from "store";

let Button: IComponent<IAddStoreProps, AddStore> = ({
  props,
  children,
  store,
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <NesButton
        style={{ ...props.style }}
        onClick={() => {
          console.log("download app");
        }}
      >
        {props.value}
      </NesButton>
    </div>
  );
};
Button = observer(Button);

export { Button };
