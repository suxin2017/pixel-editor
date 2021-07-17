import { makeObservable } from "mobx";
import {
  ComponentStore,
  ComponentType,
} from "../../packages/render/store/Component";

export class ContainerStore extends ComponentStore<{ value: string }> {
  constructor(initProps: { initProps: { value: string }; name: string }) {
    super({
      ...initProps,
      type:ComponentType.CONTAINER
    });
    makeObservable(this);
  }
}
