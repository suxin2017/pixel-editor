import { makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";
type AnyObj = { [key: string]: any };
export enum ComponentType {
  CONTAINER = 'container',
  ATOM = 'atom'
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

  constructor(options: {
    initProps: Props;
    name: string;
    children?: ComponentStore[];
    id?: string;
    type?: ComponentType;
  }) {
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
