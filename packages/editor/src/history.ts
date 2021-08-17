import {ComponentStore} from "render";
import { cloneDeep, isEqual, keys } from "lodash";
import { toJS } from "mobx";

export const HistoryRef: ComponentStore["props"][] = [];
export const HistoryAssign: ComponentStore["props"][] = [];
export let point: number = -1;
let dispatching = false;

class HistoryUtil {
  init() {
    HistoryRef.length = 0;
    HistoryAssign.length = 0;
    point = -1;
    dispatching = false;
  }
  push(propsSnapshot: ComponentStore["props"]) {
    if (!dispatching) {
      const preSnapshot = HistoryAssign[point - 1];
      if (isEqual(toJS(propsSnapshot), preSnapshot)) {
        return;
      }
      point++;
      HistoryRef.length = point + 1;
      HistoryAssign.length = point + 1;

      HistoryRef[point] = propsSnapshot;
      HistoryAssign[point] = cloneDeep(propsSnapshot);
      console.log("push hsitory =>", HistoryAssign, point);
    }
  }
  dispatch(point: number, equalCb: () => void) {
    const ref = HistoryRef[point];
    const assign = HistoryAssign[point];
    console.log("dispatch", point, toJS(ref), assign);
    if (assign) {
      if (isEqual(toJS(ref), assign)) {
        equalCb();
      } else {
        (keys(assign) as Array<keyof typeof assign>).forEach((key) => {
          console.log(`key ${key} => `, assign[key]);
          ref[key] = assign[key];
        });
      }
    }
  }
  undo() {
    if (point - 1 === -1) {
      return;
    }
    dispatching = true;
    this.dispatch(--point, () => {
      this.undo();
    });
    dispatching = false;
  }
  redo() {
    dispatching = true;
    if (point + 1 >= HistoryRef.length) {
      return;
    }
    this.dispatch(++point, () => {
      this.redo();
    });
    dispatching = false;
  }
}

export const EditorHistory = new HistoryUtil();
