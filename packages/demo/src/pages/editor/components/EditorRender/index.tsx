import Add from "../../../../components/Button";
import Page from "../../../../components/Page";
import Image from "../../../../components/Image";
import {
  editorStore,
  componentList
} from "store";
import { createRender } from "render";
import { ActiveHoc } from "./hocs/ActiveHoc";
import { DraggableHoc } from "./hocs/DraggableHoc";

export const Render = createRender({
  beforeHoc() {
    componentList.cleanAllEditorComponent();
    componentList.addEditorComponent(Page);
    componentList.addEditorComponent(Add);
    componentList.addEditorComponent(Image);
  },
  afterHoc() {
    // fix hot update bug
    editorStore.restInitState();
    const rootNode = editorStore.addComponentToRoot(Page);
    editorStore.activeComponent = rootNode;
  },
  hoc: [
    ActiveHoc,
    DraggableHoc
  ],
});
