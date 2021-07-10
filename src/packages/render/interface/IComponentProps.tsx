import { ComponentStore } from "../store/Component";

export interface IComponentProps {
  props: ComponentStore["props"];
  store: ComponentStore;
}
