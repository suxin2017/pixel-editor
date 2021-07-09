import { autorun, makeObservable, observable, override, reaction } from "mobx";
import { EditorStore } from "../../editor";
import { v4 as uuidv4 } from "uuid";

export class Component<Props = any> {
  id: string;

  @observable
  props: Props;

  name: string;

  @observable
  parent?: Component;

  @observable
  children?: Component[];

  @observable
  editStore?: EditorStore;

  historyStack?: Component[];

  constructor({
    initProps,
    name,
    children,
    id,
  }: {
    initProps: Props;
    name: string;
    children?: Component[];
    id?: string;
  }) {
    makeObservable(this);
    this.props = initProps;
    this.name = name;
    this.children = children;
    if (this.children) {
      this.children.forEach((child) => {
        child.parent = this;
      });
    }
    this.id = id ?? uuidv4();
  }

  getRootStore(): Component {
    return this.parent ? this.parent.getRootStore() : this;
  }

  getParent<T extends Component>() {
    return this.parent as T;
  }

  getEditStore() {
    return this.getRootStore().editStore;
  }
}
