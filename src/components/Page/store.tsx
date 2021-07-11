import {  makeObservable } from "mobx";
import { ComponentStore, ComponentType } from "../../packages/render/store/Component";

export class AddStore extends ComponentStore<{ value: string }> {
  constructor(initProps: {
    initProps: { value: string };
    name?: string;
    children?: ComponentStore[];
  }) {

    super({
      ...initProps,
      name: "page",
      type: ComponentType.CONTAINER
    });
    makeObservable(this);
  }
}
