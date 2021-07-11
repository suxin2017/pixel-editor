import React from "react";
import { observer } from "mobx-react-lite";
import { AddStore as ContainerStore } from "./store";
import ButtonSetting from "./Setting";
import { IEditorComponent } from "../../packages/editor/componentList";

let Container: React.FC<{
  props: { value: number };
  store: ContainerStore;
}> = ({ props, children, store }) => {
  return (
    <div onClick={(e) => {}} style={{ padding: 24 }}>
      container
      {children}
    </div>
  );
};
Container = observer(Container);

const componentConfig: IEditorComponent = {
  name: "page",
  icon: (
    <img
      src="https://img.icons8.com/dotty/80/000000/pixel-cat.png"
      alt="icon"
    />
  ),

  store: ContainerStore,
  component: Container,
  initProps: { value: "" },
  settingComponent: ButtonSetting,
};

export default componentConfig;
