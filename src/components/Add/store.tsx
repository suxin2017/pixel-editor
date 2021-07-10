import { action, makeObservable } from "mobx";
import { ComponentStore } from "../../packages/render/store/Component";

export interface IAddStoreProps {
  value: string;
  nest: { value: string };
}

export class AddStore extends ComponentStore<IAddStoreProps> {
  constructor(initProps: { initProps: IAddStoreProps; name: string }) {
    super(initProps);
    makeObservable(this);
  }

  @action
  setValue(value: string) {
    this.props.value = value;
  }
}