import {
  action,
  autorun,
  makeObservable,
  observable,
  observe,
  override,
  reaction,
} from "mobx";
import { Add, AddProps, config, Setting } from "../../components/Add";
import { createRender, IRenderProps } from "../render";
import { addComponent } from "../render/common/componentLib";
import { find } from "../render/common/dsf";
import { IComponentProps } from "../render/interface/IComponentProps";
import { Component } from "../render/store/Component";
import { observer } from "mobx-react-lite";
import { Page, PageStore } from "../../components/Page";

addComponent("add", Add);
addComponent("page", Page);

export class EditorStore {
  @observable component: Component;
  @observable activeComponent?: Component;

  constructor(component: Component) {
    makeObservable(this);
    this.component = component;
    this.component.editStore = this;
  }

  @action
  addComponent(parent: Component) {
    const newStore = new config.store(config.initConfig);

    newStore.parent = parent;
    parent.children?.push(newStore);
  }

  @action
  addComponentToRoot() {
    this.addComponent(this.component);
  }

  @action
  deleteComponent(param: string) {
    const targetCom = find(param, this.component);
    const targetIndex = targetCom?.parent?.children?.indexOf(targetCom);

    if (targetIndex != null)
      targetCom?.parent?.children?.splice(targetIndex, 1);
  }

  getActiveComponent<T extends Component>() {
    return this.activeComponent as T | undefined;
  }
}

const Render = createRender({
  hoc: [
    function ActiveHoc(Com) {
      const ActiveWrapper: React.FC<IComponentProps> = (props) => {
        const isActive =
          props.store.getEditStore()?.activeComponent?.id === props.store.id;

        return (
          <div
            style={isActive ? { border: "1px solid red" } : void 0}
            onClick={(e) => {
              e.stopPropagation();
              const editStore = props.store.getEditStore();
              console.log(editStore);
              if (editStore) {
                editStore.activeComponent = props.store;
              }
            }}
          >
            <Com
              props={props.props}
              store={props.store}
              children={props.children}
            />
          </div>
        );
      };
      return observer(ActiveWrapper);
    },
  ],
});
const editorStore = new EditorStore(
  new PageStore({
    initProps: { value: 0 },
    name: "page",
    children: [
      new AddProps({
        initProps: { value: "init" },
        name: "add",
      }),
      new AddProps({
        initProps: { value: "init" },
        name: "add",
      }),
    ],
  })
);

reaction(
  () => editorStore,
  (editorStore) => {
    if (editorStore) {
      console.log("Now I'm hungry!", editorStore);
    } else {
      console.log("I'm not hungry!");
    }
  }
);

let Editor: React.FC = () => {
  return (
    <div>
      <Render component={editorStore.component} />
      <button
        onClick={() => {
          editorStore.addComponentToRoot();
        }}
      >
        add
      </button>
      <button
        onClick={() => {
          const activeComponent = editorStore.getActiveComponent();
          if (activeComponent) {
            editorStore.deleteComponent(activeComponent.id);
          }
        }}
      >
        remove
      </button>
      <button
        onClick={() => {
          editorStore.getActiveComponent<AddProps>()?.increment();
        }}
      >
        add
      </button>
      {editorStore.activeComponent?.props.value}
      <Setting props={editorStore.activeComponent?.props || {}}></Setting>
    </div>
  );
};
Editor = observer(Editor);
export { Editor };
