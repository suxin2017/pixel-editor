import { ComponentStore } from "../render/componentStore";

export type IComponent<Props = any, Store = ComponentStore<Props>> = React.FC<
  {
    props: Props;
    store: Store;
  } & Props
>;

export interface IRenderComponent<Props = any, Store = any> {
  store: new (args: IComponentStoreConstructorParam<Props>) => Store;
  component: IComponent<Props, Store>;
}

export type AnyObj = { [key: string]: any };

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

export type ISettingComponent<
  Props = any,
  Store = ComponentStore<Props>
> = IComponent<Props, Store>;

export interface IEditorComponent<Props = any, Store = ComponentStore<Props>>

extends IRenderComponent<Props, Store>{
  name: string;
  icon: React.ReactNode;
  initProps: Props;
  settingComponent: IComponent<Props, Store>;
}

export interface IComponentProps {
  props: ComponentStore["props"];
  store: ComponentStore;
}