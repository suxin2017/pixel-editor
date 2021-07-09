import { autorun } from "mobx";
import { Component } from "../render/store/Component";

export const HistoryStack: Component[] = [];
export let point: number = 0;

export abstract class AbstractHistory<T> extends Component<T> {
  push() {
    HistoryStack[point++] = Object.assign({}, this);
  }
  redo() {
    const target = HistoryStack[point--];
    if (target) {
	console.log(target)
    }
  }
}
