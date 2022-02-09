import { editorStore } from "@toy20/store";
import { createRender, IRenderProps } from "@toy20/render";
import { ActiveHoc } from "./hocs/ActiveHoc";
import { DraggableHoc } from "./hocs/DraggableHoc";

export const initRender = async () => {
  let Page: any;
  return await createRender({
    async beforeHoc() {
      editorStore.componentList?.cleanAllEditorComponent();
      //@ts-ignore
      const AButton = await import("remote/Button");
      for (const Com of AButton.default.components) {
        if (Com.name === 'container') {
          Page = Com;
        }
        editorStore.componentList?.addEditorComponent(Com);
      }
    },
    afterHoc() {
      // fix hot update bug
      editorStore.restInitState();
      const rootNode = editorStore.addComponentToRoot(Page);
      editorStore.activeComponent = rootNode;
    },
    hoc: [ActiveHoc, DraggableHoc],
  });
};
