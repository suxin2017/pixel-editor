import React from "react";
import { observer } from "mobx-react-lite";
import { ContainerStore } from "./store";
import ButtonSetting from "./Setting";
import { IEditorComponent } from "store";

let Container: React.FC<{
  props: { value: number };
  store: ContainerStore;
}> = ({ props, children, store }) => {
  return <div style={{ padding: 24 }}>{children}</div>;
};
Container = observer(Container);

const componentConfig: IEditorComponent = {
  name: "container",
  icon: (
    <img src="https://img.icons8.com/ios/50/000000/box--v1.png" alt="icon" />
  ),
  store: ContainerStore,
  component: Container,
  initProps: { value: "" },
  settingComponent: ButtonSetting,
};

export default componentConfig;
