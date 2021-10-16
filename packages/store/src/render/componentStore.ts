import { AnyObj, ComponentType, IComponentStoreConstructorParam } from "../types";

import { cloneDeep,filter,map } from "lodash";
import { makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";

import { componentLib } from "./componentLib";

export class ComponentStore<Props = AnyObj> {
  id: string;

  @observable
  props: { $id: string } & Props;

  name: string;

  type: ComponentType = ComponentType.ATOM;

  parent?: ComponentStore;

  @observable
  children?: ComponentStore[];

  historyStack?: ComponentStore[];

  debug?: boolean;

  constructor(options: IComponentStoreConstructorParam<Props>) {
    makeObservable(this);
    this.name = options.name;
    this.children = options.children;
    if (this.children) {
      debugger
      this.children.forEach((child) => {
        child.parent = this;
      });
    }
    this.id = options.id ?? uuidv4();
    this.props = { ...options.initProps, $id: this.id };
    console.log(options)
    if (options.type) {
      this.type = options.type;
    }
  }

  getRootStore(): ComponentStore {
    return this.parent ? this.parent.getRootStore() : this;
  }

  getParent<T extends ComponentStore>() {
    return this.parent as T;
  }
}

/**
 * render data -> json data
 * @param com 
 * @returns 
 */
export const serializing = (com: ComponentStore) => {
  return cloneDeep(com);
}
/**
 * json data -> render data
 * @param com 
 * @returns 
 */
export const deserializing = (com: ComponentStore) => {
  let result: ComponentStore<AnyObj> | undefined;
  let component = componentLib.getComponent(com.name);
  if (component) {
    const { children, ...props } = com;
    result = new component.store({
      initProps: com.props,
      ...props
    });
    if (children) {
      const obvChildren = map(children,child => {
        const childProxy =  deserializing(child);
        childProxy.parent = result
        return childProxy;
      })
      if (result) {
        result.children = obvChildren;
      }
    }
  }
  if (!result) {
    throw Error('反序列化失败')
  }
  return result;
}