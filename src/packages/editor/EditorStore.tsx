import { action, makeObservable, observable } from "mobx";
import { dsf, find } from "../render/common/dsf";
import { ComponentStore, ComponentType } from "../render/store/Component";
import React from "react";
import { getEditorComponent, IEditorComponent } from "./componentList";
import { deepObserve, IDisposer } from "mobx-utils";
import { EditorHistory } from "./history";
import { throttle } from "lodash";

const disposerMap = new Map<string, IDisposer>();

export class EditorStore {
  @observable component?: ComponentStore;
  @observable activeComponent?: ComponentStore;

  constructor(component?: ComponentStore) {
    makeObservable(this);
    this.component = component;
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

    EditorHistory.push(newStore.props);
    const disposer = deepObserve(
      newStore.props,
      throttle(
        (change, path, root) => {
          EditorHistory.push(root);
        },
        1000,
        { trailing: false }
      )
    );
    disposerMap.set(newStore.id, disposer);
    if (!parent) {
      this.component = newStore;
    } else {
      newStore.parent = parent;
      if (!parent.children) {
        parent.children = [];
      }
      parent.children?.push(newStore);
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
        const disposer = disposerMap.get(targetCom.id);
        if (disposer) {
          disposer();
        }
        disposerMap.delete(targetCom.id);
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
      return getEditorComponent(this.activeComponent.name)?.settingComponent;
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
    EditorHistory.init();
  }
}

export const editorStore = new EditorStore();
export const EditorContext = React.createContext(editorStore);
export const EditorContextProvider = EditorContext.Provider;
export const useEditorContext = () => React.useContext(EditorContext);
