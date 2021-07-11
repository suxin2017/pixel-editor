import React from "react";
import { ComponentStore, IComponentStoreConstructorParam } from "../store/Component";
const debug = (message: string, ...otherParams: any[]) => {
  console.log(
    `%c render:component-list %c${message}`,
    "color:blue",
    "color:black",
    ...otherParams
  );
};
export type IComponent<Props = any, Store = ComponentStore<Props>> = React.FC<
  {
    props: Props;
    store: Store;
  } & Props
>;
export interface IRenderComponent<Props = any,Store = any>{
  store: new (args: IComponentStoreConstructorParam<Props>) => Store;
  component: IComponent<Props, Store>;
}
export const componentLibs = new Map<string, IRenderComponent>();

export const cleanComponentLibs = () => {
    debug("clear all components %s");
  return componentLibs.clear();
};
export const addComponent = (name: string, value: IRenderComponent) => {
  if (!componentLibs.has(name)) {
    debug("add component %s", name);

    return componentLibs.set(name, value);
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
