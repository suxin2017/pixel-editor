import React from "react";
import { observer } from "mobx-react-lite";
import { AddStore } from "./store";
import ButtonSetting from "./Setting";
import { IEditorComponent } from "../../packages/editor/componentList";

let Page: React.FC<{
  props: { value: number };
  store: AddStore;
}> = ({ props, children, store }) => {
  console.log(children);
  return (
    <div onClick={(e) => {}}>
      pages
      {children}
    </div>
  );
};
Page = observer(Page);

const componentConfig: IEditorComponent = {
  name: "page",
  icon: (
    <img
      src="https://img.icons8.com/dotty/80/000000/pixel-cat.png"
      alt="icon"
    />
  ),
  
  store: AddStore,
  component: Page,
  initProps: { value: "" },
  settingComponent: ButtonSetting,
};

export default componentConfig;
