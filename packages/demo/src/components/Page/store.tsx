import { makeObservable } from "mobx";
import {
  ComponentStore,
  ComponentType,
} from "render";

export class ContainerStore extends ComponentStore<{ value: string }> {
  constructor(initProps: { initProps: { value: string }; name: string }) {
    super({
      ...initProps,
      type:ComponentType.CONTAINER
    });
    // makeObservable(this);
  }
}
