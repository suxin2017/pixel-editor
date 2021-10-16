import { action, makeObservable } from "mobx";
import { ComponentStore } from "store";

export interface IAddStoreProps {
  value: string;
  style?: React.CSSProperties
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
