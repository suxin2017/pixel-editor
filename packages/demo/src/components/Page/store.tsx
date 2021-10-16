import {
  ComponentStore,
  ComponentType,
} from "store";

export class ContainerStore extends ComponentStore<{ value: string }> {
  constructor(initProps: { initProps: { value: string }; name: string }) {
    super({
      ...initProps,
      type:ComponentType.CONTAINER
    });
    // makeObservable(this);
  }
}
