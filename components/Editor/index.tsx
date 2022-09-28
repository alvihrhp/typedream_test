import React, { useState, useMemo, useCallback } from "react";
/** Components */
import Toolbar from "../Toolbar";
/** Slate */
import { createEditor, BaseEditor, Descendant } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
/** Custom Hooks */
import { useEditorConfig, useSelection } from "../../customHooks";

interface CustomTypes {
  Editor: BaseEditor & ReactEditor;
}

interface Props {
  document: Descendant[];
  setDocument: React.Dispatch<React.SetStateAction<Descendant[]>>;
}

const Editor: React.FC<Props> = ({ document, setDocument }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const { renderElement, renderLeaf, onKeyDown }: any = useEditorConfig(editor);

  const [selection, setSelection] = useSelection(editor);

  const onChangeHandler = useCallback(
    (document: Descendant[]) => {
      setDocument(document);
      setSelection(editor.selection);
    },
    [editor.selection, setDocument, setSelection]
  );

  return (
    <div className="w-full">
      <Slate editor={editor} value={document} onChange={onChangeHandler}>
        <Toolbar selection={selection}></Toolbar>
        <Editable
          autoFocus
          spellCheck
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
          className="border border-[#7f00ff] shadow shadow-[#7f00ff]/75 rounded py-3 px-4 text-white"
        />
      </Slate>
    </div>
  );
};

export default Editor;
