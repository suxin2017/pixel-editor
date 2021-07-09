import { observer } from "mobx-react-lite";
import React from "react";
import { componentLibs, getComponent } from "./common/componentLib";
import { IComponentProps } from "./interface/IComponentProps";
import { Component } from "./store/Component";

export interface IRenderProps {
  component: Component;
}

let Render: React.FC<IRenderProps> = ({ component }) => {
  const Component = getComponent(component.name);
  if (!Component) {
    throw Error("component not found");
  }
  return (
    <Component props={component.props} store={component}>
      {component.children?.map((child, idx) => {
        return <Render key={idx} component={child}></Render>;
      })}
    </Component>
  );
};

Render = observer(Render);

export interface ICreateRenderParams {
  hoc?: ((Component: React.FC<IComponentProps>) => React.FC<IComponentProps>)[];
  componentJson?: string | Component;
}
const createRender = (options?: ICreateRenderParams) => {
  if (options?.hoc) {
    componentLibs.forEach((Com, key) => {
      const realCom = options.hoc?.reduce((c, hoc) => hoc(c), Com);
      if (realCom) {
        componentLibs.set(key, realCom);
      } else {
        throw Error("component lose ");
      }
    });
  }
  return Render;
};
export { createRender };
