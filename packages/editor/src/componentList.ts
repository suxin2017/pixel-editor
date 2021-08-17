import React from "react";
import { addComponent, cleanComponentLibs, deleteComponent, IComponent, IRenderComponent } from "render";
import { ComponentStore } from "render";

export type ISettingComponent<
  Props = any,
  Store = ComponentStore<Props>
> = IComponent<Props, Store>;

export interface IEditorComponent<Props = any, Store = ComponentStore<Props>> extends IRenderComponent<Props,Store>{
  name: string;
  icon: React.ReactNode;
  initProps: Props;
  settingComponent: IComponent<Props, Store>;
}

export const componentList = new Map<string, IEditorComponent>();
export const cleanAllEditorComponent = () => {
  componentList.clear();
  cleanComponentLibs();
}
export const addEditorComponent = (editorComponent: IEditorComponent) => {
  if (!componentList.has(editorComponent.name)) {
    addComponent(editorComponent.name, {
      component: editorComponent.component,
      store:editorComponent.store
    });
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
  console.log(componentList.values())
  return Array.from(componentList.values());
}
