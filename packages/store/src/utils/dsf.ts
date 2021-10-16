import { ComponentStore } from "../render/componentStore";

export function dsf(component: ComponentStore, cb: (com: ComponentStore) => void) {
  cb(component);
  component.children?.forEach((com) => {
    dsf(com, cb);
  });
}
