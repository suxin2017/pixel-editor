import { observer } from "mobx-react-lite";
import { Button as NesButton } from "../../packages/nes/Button";
import { AddStore, IAddStoreProps } from "./store";
import ButtonSetting from "./Setting";
import { IEditorComponent } from "editor";
import { IComponent } from "render";

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

const componentConfig: IEditorComponent<IAddStoreProps, AddStore> = {
  name: "button",
  icon: (
    <img src="https://img.icons8.com/ios/50/000000/button2.png" alt="ignore" />
  ),
  store: AddStore,
  component: Button,
  initProps: {
    value: "立即下载",
    style: {
      background: "#fff",
    },
  },
  settingComponent: ButtonSetting,
};

export default componentConfig;
