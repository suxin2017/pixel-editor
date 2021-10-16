import type { IRenderComponent } from "../types";

import debugFactory from 'debug';
const debug = debugFactory('store')

export class ComponentLib {
  componentLibs = new Map<string, IRenderComponent>();
  cleanComponentLibs() {
    debug("clear all components %s");
    return this.componentLibs.clear();
  };

  addComponent(name: string, value: IRenderComponent) {
    if (!this.componentLibs.has(name)) {
      debug("add component %s", name);

      return this.componentLibs.set(name, value);
    }
    return this.componentLibs;
  };

  deleteComponent(name: string) {
    debug("delete component %s", name);
    return this.componentLibs.delete(name);
  };

  getComponent(name: string) {
    debug("get component %s", name);
    return this.componentLibs.get(name);
  };
}

export const componentLib = new ComponentLib();