import { Editor, Transforms } from "slate";

export function getActiveStyles(editor: any) {
  return new Set(Object.keys(Editor.marks(editor) ?? {}));
}

export function toggleStyle(editor: any, style: any) {
  const activeStyles = getActiveStyles(editor);
  if (activeStyles.has(style)) {
    Editor.removeMark(editor, style);
  } else {
    Editor.addMark(editor, style, true);
  }
}

export function getTextBlockStyle(editor: any) {
  const selection = editor.selection;
  if (selection == null) {
    return null;
  }

  const topLevelBlockNodesInSelection = Editor.nodes(editor, {
    at: editor.selection,
    mode: "highest",
    match: (n) => Editor.isBlock(editor, n),
  });

  let blockType = null;
  let nodeEntry = topLevelBlockNodesInSelection.next();
  while (!nodeEntry.done) {
    const [node, _]: any = nodeEntry.value;
    if (blockType == null) {
      blockType = node.type;
    } else if (blockType !== node.type) {
      return "multiple";
    }

    nodeEntry = topLevelBlockNodesInSelection.next();
  }

  return blockType;
}

export function toggleBlockType(editor: any, blockType: any) {
  const currentBlockType = getTextBlockStyle(editor);
  const changeTo = currentBlockType === blockType ? "paragraph" : blockType;
  const transforms: any = Transforms;
  transforms.setNodes(
    editor,
    { type: changeTo },
    // Node filtering options supported here too. We use the same
    // we used with Editor.nodes above.
    { at: editor.selection, match: (n: any) => Editor.isBlock(editor, n) }
  );
}
