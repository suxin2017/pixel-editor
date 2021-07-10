import { autorun, makeObservable, observable, override, reaction } from "mobx";
import { v4 as uuidv4 } from "uuid";
type AnyObj = { [key: string]: any };
export class ComponentStore<Props = AnyObj> {
  id: string;

  @observable
  props: { $id: string } & Props;

  name: string;

  @observable
  parent?: ComponentStore;

  @observable
  children?: ComponentStore[];

  historyStack?: ComponentStore[];

  constructor({
    initProps,
    name,
    children,
    id,
  }: {
    initProps: Props;
    name: string;
    children?: ComponentStore[];
    id?: string;
  }) {
    makeObservable(this);
    this.name = name;
    this.children = children;
    if (this.children) {
      this.children.forEach((child) => {
        child.parent = this;
      });
    }
    this.id = id ?? uuidv4();
    this.props = { ...initProps, $id: this.id };
  }

  getRootStore(): ComponentStore {
    return this.parent ? this.parent.getRootStore() : this;
  }

  getParent<T extends ComponentStore>() {
    return this.parent as T;
  }
}
