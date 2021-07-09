import React from "react";
import { IComponentProps } from "../interface/IComponentProps";
export const componentLibs = new Map<string, React.FC<IComponentProps>>();
export const addComponent = (name: string, component: React.FC<any>) => {
  if (!componentLibs.has(name)) {
    return componentLibs.set(name, component);
  }
  return componentLibs;
};

export const deleteComponent = (name: string) => {
  return componentLibs.delete(name);
};

export const getComponent = (name: string) => {
  return componentLibs.get(name);
};
