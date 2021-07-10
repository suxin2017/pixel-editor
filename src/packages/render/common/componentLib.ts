import React from "react";
import { IComponentProps } from "../interface/IComponentProps";
const debug = (message: string, ...otherParams: any[]) => {
  console.log(
    `%c render:component-list %c${message}`,
    "color:blue",
    "color:black",
    ...otherParams
  );
};
export const componentLibs = new Map<string, React.FC<IComponentProps>>();

export const addComponent = (name: string, component: React.FC<any>) => {
  if (!componentLibs.has(name)) {
    debug("add component %s", name);

    return componentLibs.set(name, component);
  }
  return componentLibs;
};

export const deleteComponent = (name: string) => {
  debug("delete component %s", name);
  return componentLibs.delete(name);
};

export const getComponent = (name: string) => {
  debug("get component %s", name);
  return componentLibs.get(name);
};
