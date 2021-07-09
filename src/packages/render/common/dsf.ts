import { Component } from "../store/Component";

export function dsf(component: Component, cb: (com: Component) => void) {
  cb(component);
  component.children?.forEach((com) => {
    dsf(com, cb);
  });
}

export function find(
  component: Component,
  root: Component
): Component | undefined;
export function find(id: string, root: Component): Component | undefined;
export function find(component: Component | string, root: Component) {
  let id: string;
  if (typeof component === "string") {
    id = component;
  } else {
    id = component.id;
  }
  let result: Component | undefined;
  dsf(root, (com) => {
    if (com.id === id) {
      result = com;
    }
  });
  return result;
}
