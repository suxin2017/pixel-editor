import {
  ComponentStore,
  ComponentType,
} from "@toy20/store";

export class ContainerStore extends ComponentStore<{ value: string }> {
  constructor(initProps: { initProps: { value: string }; name: string }) {
    super({
      ...initProps,
      type:ComponentType.CONTAINER
    });
    // makeObservable(this);
  }
}
