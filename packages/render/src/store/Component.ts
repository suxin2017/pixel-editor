import { cloneDeep } from "lodash";
import { makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { getComponent } from "../common/componentLib";
type AnyObj = { [key: string]: any };
export enum ComponentType {
  CONTAINER = 'container',
  ATOM = 'atom'
}
export interface IComponentStoreConstructorParam<Props>  {
  initProps: Props;
  name: string;
  children?: ComponentStore[];
  id?: string;
  type?: ComponentType;
}
export class ComponentStore<Props = AnyObj> {
  id: string;

  @observable
  props: { $id: string } & Props;

  name: string;

  type: ComponentType = ComponentType.ATOM;

  @observable
  parent?: ComponentStore;

  @observable
  children?: ComponentStore[];

  historyStack?: ComponentStore[];

  constructor(options:IComponentStoreConstructorParam<Props>) {
    makeObservable(this);
    this.name = options.name;
    this.children = options.children;
    if (this.children) {
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
  let result;
  let component = getComponent(com.name);
  if (component) {
    const { children,...props } = com;
    result = new component.store({
      initProps: com.props,
      ...props
    });
    if (children) {
      const obvChildren = children.map(child => {
          return deserializing(child)
      })
      result.children = obvChildren;
    }
  }
  return result;
}