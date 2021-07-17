import { makeObservable } from "mobx";
import { ComponentStore } from "../../packages/render/store/Component";

export interface IImageStoreProps {
  src: string | undefined;
}

export class ImageStore extends ComponentStore<IImageStoreProps> {
  constructor(initProps: { initProps: IImageStoreProps; name: string }) {
    super(initProps);
    makeObservable(this);
  }
}
