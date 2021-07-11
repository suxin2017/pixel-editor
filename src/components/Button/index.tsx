import React from "react";
import { observer } from "mobx-react-lite";
import { Button as NesButton } from "../../packages/nes/Button";
import { AddStore, IAddStoreProps } from "./store";
import ButtonSetting from "./Setting";
import {
  IComponent,
  IEditorComponent,
} from "../../packages/editor/componentList";

let Button: IComponent<IAddStoreProps, AddStore> = ({
  props,
  children,
  store,
}) => {
  console.log(props);
  React.useEffect(() => {
    setTimeout(() => {
      // async set
      if (props.value != null) props.value = "1234";
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div onClick={(e) => {}}>
      <NesButton
        style={{ color: "red",...props.style }}
        onClick={() => {
          console.log("download app");
        }}
      >
        {props.value}
      </NesButton>
      <div>nest.value=&gt; {props.nest.value}</div>
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
    value: "",
    nest: { value: "" },
    style: {
      background: "#fff",
    },
  },
  settingComponent: ButtonSetting,
};

export default componentConfig;
