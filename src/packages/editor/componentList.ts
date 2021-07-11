import React from "react";
import { addComponent, cleanComponentLibs, deleteComponent } from "../render/common/componentLib";
import { ComponentStore } from "../render/store/Component";
export type IComponent<Props = any, Store = ComponentStore<Props>> = React.FC<
  {
    props: Props;
    store: Store;
  } & Props
>;
export type ISettingComponent<
  Props = any,
  Store = ComponentStore<Props>
> = IComponent<Props, Store>;

export interface IEditorComponent<Props = any, Store = ComponentStore<Props>> {
  name: string;
  icon: React.ReactNode;
  store: new (...args: any[]) => Store;
  component: IComponent<Props, Store>;
  initProps: Props;
  settingComponent: IComponent<Props, Store>;
}

export const componentList = new Map<string, IEditorComponent>();
export const cleanAllEditorComponent = () => {
  componentList.clear();
  cleanComponentLibs();
}
export const addEditorComponent = (editorComponent: IEditorComponent) => {
  console.log(componentList,'componentList')
  if (!componentList.has(editorComponent.name)) {
    addComponent(editorComponent.name, editorComponent.component);
    return componentList.set(editorComponent.name, editorComponent);
  }
  return componentList;
};

export const deleteEditorComponent = (name: string) => {
  deleteComponent(name);
  return componentList.delete(name);
};

export const getEditorComponent = <T extends IEditorComponent>(
  name: string
) => {
  return componentList.get(name) as T;
};
export const getAllComponent = () => {
  return Array.from(componentList.values());
}
