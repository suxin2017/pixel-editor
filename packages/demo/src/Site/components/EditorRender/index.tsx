import Add from "../../../components/Button";
import Page from "../../../components/Page";
import Image from "../../../components/Image";
import {
  addEditorComponent,
  cleanAllEditorComponent,
} from "editor";
import {
  editorStore,
} from "editor";
import { createRender } from "render";
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
