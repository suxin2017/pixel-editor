import { action, makeObservable, observable } from "mobx";
import { ComponentLib, componentLib } from "../render/componentLib";
import { IComponent, IEditorComponent, IRenderComponent } from "../types";

export class ComponentList {
  componentList = new Map<string, IEditorComponent>();

  componentLib = componentLib;

  constructor() {
  }

  cleanAllEditorComponent() {
    this.componentList.clear();
    this.componentLib.cleanComponentLibs();
  }
  
  addEditorComponent(editorComponent: IEditorComponent) {
    if (!this.componentList.has(editorComponent.name)) {
      console.log(`add component ${editorComponent.name}`);

      this.componentLib.addComponent(editorComponent.name, {
        component: editorComponent.component,
        store: editorComponent.store,
      });
      return this.componentList.set(editorComponent.name, editorComponent);
    }
    return this.componentList;
  }
  
  deleteEditorComponent(name: string) {
    this.componentLib.deleteComponent(name);
    return this.componentList.delete(name);
  }

  getEditorComponent = <T extends IEditorComponent>(name: string) => {
    return this.componentList.get(name) as T;
  };
  getAllComponent() {
    return Array.from(this.componentList.values());
  }
}

export const componentList = new ComponentList();