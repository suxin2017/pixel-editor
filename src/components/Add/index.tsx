import React from "react";
import { observer } from "mobx-react-lite";
import { Button } from "../../packages/nes/Button";
import { AddStore, IAddStoreProps } from "./store";
import ButtonSetting from "./Setting";
import {
  IComponent,
  IEditorComponent,
} from "../../packages/editor/componentList";

let Add: IComponent<IAddStoreProps, AddStore> = ({
  props,
  children,
  store,
}) => {
  console.log(props);
  React.useEffect(() => {
    setTimeout(() => {
      if (props.value != null) props.value = "1234";
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div onClick={(e) => {}}>
      <Button
        onClick={() => {
          console.log("download app");
        }}
      >
        {props.value}
      </Button>
      {props.nest.value}
    </div>
  );
};
Add = observer(Add);

const componentConfig: IEditorComponent<IAddStoreProps, AddStore> = {
  name: "button",
  icon: <img src="https://img.icons8.com/ios/50/000000/button2.png" alt="ignore"/>,
  store: AddStore,
  component: Add,
  initProps: { value: "", nest: { value: "" } },
  settingComponent: ButtonSetting,
};

export default componentConfig;
