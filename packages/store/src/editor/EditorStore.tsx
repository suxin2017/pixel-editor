import { action, makeObservable, observable } from "mobx";
import React from "react";
import { ComponentList,componentList } from "./componentList";
import { ComponentStore } from "../render/componentStore";
import { IEditorComponent, ComponentType } from "../types";
import { dsf } from "../utils/dsf";
import { find } from "../utils/find";
import { editorHistory } from "./history";

export class EditorStore {

  @observable
  component?: ComponentStore;
  
  @observable
  activeComponent?: ComponentStore;

  @observable
  componentList?: ComponentList;

  @observable
  init?: boolean;

  constructor(component?: ComponentStore) {
    makeObservable(this);
    this.component = component;
    this.componentList = componentList;
    this.init = false;
  }

  initResource() {
    this.init = false;
  }
  finishInitResource() {
    this.init = true;
  }

  @action
  addComponent(
    parent: ComponentStore | undefined,
    component: IEditorComponent
  ) {
    const newStore = new component.store({
      name: component.name,
      initProps: component.initProps,
    });

    if (!parent) {
      this.component = newStore;
    } else {
      newStore.parent = parent;
      if (!parent.children) {
        parent.children = [];
      }
      parent.children?.push(newStore);
    }
    if (this.component) {
      editorHistory.push(this.component);
    }

    return newStore;
  }

  @action
  addComponentToRoot(component: IEditorComponent) {
    return this.addComponent(this.component, component);
  }

  @action
  addComponentToNearParentComponent(component: IEditorComponent) {
    if (!this.activeComponent) {
      return this.addComponentToRoot(component);
    } else {
      let node: ComponentStore | undefined = this.activeComponent;
      while (node && node.type !== ComponentType.CONTAINER) {
        node = node.parent;
      }
      if (!node) {
        throw new Error("The nearest parent container component was not found");
      }
      return this.addComponent(node, component);
    }
  }

  @action
  deleteComponent(id?: string) {
    if (this.component) {
      let targetCom = this.activeComponent;
      if (id) {
        targetCom = find(id, this.component);
      }
      // TODO need delete the root node ?
      const targetIndex = targetCom?.parent?.children?.indexOf(targetCom);

      if (targetCom != null && targetIndex != null) {
        targetCom.parent?.children?.splice(targetIndex, 1);
      } else {
        console.warn("no component delete");
      }
    }
  }

  getActiveComponent<T extends ComponentStore>() {
    return this.activeComponent as T | undefined;
  }

  getActiveSetting() {
    if (this.activeComponent) {
      return this.componentList?.getEditorComponent(this.activeComponent.name)?.settingComponent;
    }
  }

  findComponentById(id: string) {
    let result: ComponentStore | undefined;
    if (this.component) {
      dsf(this.component, (com) => {
        if (id === com.id) {
          result = com;
        }
      });
    }
    return result;
  }

  @action
  moveComponent(id: string, from: number, to: number) {
    const component = this.findComponentById(id);
    if (component) {
      component.parent?.children?.splice(to, 0, component);
      component?.parent?.children?.splice(from, 1);
    }
  }

  @action
  setActiveComponentById(id: string) {
    const component = this.findComponentById(id);
    if (component) {
      this.activeComponent = component;
    }
  }

  restInitState() {
    this.component = undefined;
    editorHistory.init();
  }
}

export const editorStore = new EditorStore();
export const EditorContext = React.createContext(editorStore);
export const EditorContextProvider = EditorContext.Provider;
export const useEditorContext = () => React.useContext(EditorContext);
