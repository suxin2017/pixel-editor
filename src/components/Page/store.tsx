import { action, makeObservable } from "mobx";
import { ComponentStore } from "../../packages/render/store/Component";

export class AddStore extends ComponentStore<{ value: string }> {
  constructor(initProps: {
    initProps: { value: string };
    name?: string;
    children?: ComponentStore[];
  }) {
    super({
      ...initProps,
      name: "page",
    });
    makeObservable(this);
  }

  @action
  increment() {
    this.props.value = "";
  }
}
