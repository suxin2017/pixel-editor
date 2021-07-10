import { action, makeObservable, observable } from "mobx";
import { find } from "../render/common/dsf";
import { ComponentStore } from "../render/store/Component";
import React from "react";
import { getEditorComponent, IEditorComponent } from "./componentList";
import { deepObserve, IDisposer } from "mobx-utils";
import { History } from "./history";
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

    History.push(newStore.props);
    const disposer = deepObserve(
      newStore.props,
      throttle((change, path, root) => {
        History.push(root);
      }, 1000,{ 'trailing': false })
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
  deleteComponent(param: string) {
    if (this.component) {
      const targetCom = find(param, this.component);
      const targetIndex = targetCom?.parent?.children?.indexOf(targetCom);

      if (targetCom != null && targetIndex != null) {
        targetCom.parent?.children?.splice(targetIndex, 1);
        const disposer = disposerMap.get(targetCom.id);
        if (disposer) {
          disposer();
        }
        disposerMap.delete(targetCom.id);
      }
    }
  }

  getActiveComponent<T extends ComponentStore>() {
    return this.activeComponent as T | undefined;
  }

  getActiveSetting() {
    console.log(this.activeComponent);
    if (this.activeComponent) {
      return getEditorComponent(this.activeComponent.name).settingComponent;
    }
  }
}

export const editorStore = new EditorStore();
export const EditorContext = React.createContext(editorStore);
export const EditorContextProvider = EditorContext.Provider;
export const useEditorContext = () => React.useContext(EditorContext);
