import { observer } from "mobx-react-lite";
import React from "react";
import { ComponentStore, componentLib, editorStore } from "@toy20/store";
export interface IComponentProps {
  props: ComponentStore["props"];
  store: ComponentStore;
}

export interface IRenderProps {
  component: ComponentStore;
}

let Render: React.FC<IRenderProps> = ({ component }) => {
  const Component = componentLib.getComponent(component.name)?.component;
  if (!Component) {
    console.debug("component not found");
    return null;
  }
  return (
    <Component props={component.props} store={component}>
      {component.children?.map((child) => {
        return <Render key={child.id} component={child}></Render>;
      })}
    </Component>
  );
};

Render = observer(Render);

export interface ICreateRenderParams {
  beforeHoc?: () => Promise<void>;
  hoc?: ((Component: React.FC<IComponentProps>) => React.FC<IComponentProps>)[];
  afterHoc?: () => void;
  componentJson?: string | ComponentStore;
}
const createRender = async (options?: ICreateRenderParams) => {
  if (options?.beforeHoc) {
    await options.beforeHoc();
  }

  if (options?.hoc) {
    componentLib.componentLibs.forEach((Com, key) => {
      const realCom = options.hoc?.reduce((c, hoc) => hoc(c), Com.component);
      if (realCom) {
        componentLib.componentLibs.set(key, {
          store: Com.store,
          component: realCom,
        });
      } else {
        throw Error("component lose ");
      }
    });
  }
  if (options?.afterHoc) {
    options.afterHoc();
  }
  editorStore.finishInitResource();
  return Render;
};
export { createRender };
