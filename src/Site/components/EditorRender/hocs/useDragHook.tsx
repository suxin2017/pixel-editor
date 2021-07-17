import { throttle } from "lodash";
import { useEditorContext } from "../../../../packages/editor/EditorStore";

interface IUseDragOpt {
  onChange: (cur: number, tar: number) => void;
}
let moveEle: HTMLDivElement;

export function useDrag(props: IUseDragOpt) {
  const editorContext = useEditorContext();

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const currNode = e.currentTarget;
    const id = moveEle.dataset["id"];
    if (id) {
      editorContext.setActiveComponentById(id);
    }
    moveEle = currNode;
  };

  const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onDragOver = throttle(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = "move";
      const currNode = e.currentTarget;
      const { top, height } = currNode.getBoundingClientRect();

      if (moveEle !== currNode && moveEle.parentNode === currNode.parentNode) {
        //   下向上移动
        if (e.pageY - top <= height / 2) {
          currNode.parentNode?.insertBefore(moveEle, currNode);
        } else {
          if (currNode.nextElementSibling) {
            currNode.parentElement?.insertBefore(
              moveEle!,
              currNode.nextElementSibling
            );
          } else {
            currNode.parentElement!.appendChild(moveEle!);
          }
        }
      }
    },
    200,
    {
      trailing: false,
    }
  );

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const moveNode = moveEle;
    const currNode = e.currentTarget;

    if (moveEle !== currNode && moveEle.parentNode === currNode.parentNode) {
      const to = Array.from(currNode!.parentElement!.children).indexOf(
        currNode
      );
      const from = Array.from(moveNode!.parentElement!.children).indexOf(
        moveNode
      );
      const id = moveEle.dataset["id"];
      if (id) {
        editorContext.moveComponent(id, from, to);
      }
    }
  };

  return {
    onDrag,
    onDragEnd,
    onDragEnter,
    onDragOver,
    onDragStart,
  };
}
