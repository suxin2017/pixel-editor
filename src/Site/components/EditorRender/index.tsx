import Add from "../../../components/Button";
import Page from "../../../components/Page";
import Image from "../../../components/Image";
import {
  addEditorComponent,
  cleanAllEditorComponent,
} from "../../../packages/editor/componentList";
import {
  editorStore,
} from "../../../packages/editor/EditorStore";
import { createRender } from "../../../packages/render";
import { ActiveHoc } from "./hocs/ActiveHoc";
import { DraggableHoc } from "./hocs/DraggableHoc";

export const Render = createRender({
  beforeHoc() {
    cleanAllEditorComponent();
    addEditorComponent(Page);
    addEditorComponent(Add);
    addEditorComponent(Image);
  },
  afterHoc() {
    // fix hot update bug
    editorStore.restInitState();
    const rootNode = editorStore.addComponentToRoot(Page);
    console.log(rootNode)
    editorStore.activeComponent = rootNode;
  },
  hoc: [
    ActiveHoc,
    DraggableHoc
  ],
});
