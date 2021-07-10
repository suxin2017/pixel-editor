import { ComponentStore } from "../store/Component";

export function dsf(component: ComponentStore, cb: (com: ComponentStore) => void) {
  cb(component);
  component.children?.forEach((com) => {
    dsf(com, cb);
  });
}

export function find(
  component: ComponentStore,
  root: ComponentStore
): ComponentStore | undefined;
export function find(id: string, root: ComponentStore): ComponentStore | undefined;
export function find(component: ComponentStore | string, root: ComponentStore) {
  let id: string;
  if (typeof component === "string") {
    id = component;
  } else {
    id = component.id;
  }
  let result: ComponentStore | undefined;
  dsf(root, (com) => {
    if (com.id === id) {
      result = com;
    }
  });
  return result;
}
