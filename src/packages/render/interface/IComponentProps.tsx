import { Component } from "../store/Component";

export interface IComponentProps {
  props: Component["props"];
  store: Component;
}
