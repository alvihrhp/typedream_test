import { useCallback } from "react";
/** Slate */
import { Element } from "slate";
import { DefaultElement, RenderElementProps } from "slate-react";
/** Is-Hotkey */
import isHotkey from "is-hotkey";
/** Utils */
import { toggleStyle } from "../../utils/editorUtils";

interface CustomElement extends RenderElementProps {
  type: "paragraph";
  children: CustomText[];
  element: any;
  attributes: any;
}

type CustomText = { type: string; text: string; children: any };

export default function useEditorConfig(editor: any) {
  const onKeyDown = useCallback(
    (event: any) => KeyBindings.onKeyDown(editor, event),
    [editor]
  );
  return { renderElement, renderLeaf, onKeyDown };
}

const KeyBindings = {
  onKeyDown: (editor: any, event: any) => {
    if (isHotkey("mod+b", event)) {
      toggleStyle(editor, "bold");
      return;
    }
    if (isHotkey("mod+i", event)) {
      toggleStyle(editor, "italic");
      return;
    }
    if (isHotkey("mod+c", event)) {
      toggleStyle(editor, "code");
      return;
    }
    if (isHotkey("mod+u", event)) {
      toggleStyle(editor, "underline");
      return;
    }
  },
};

function renderLeaf({
  attributes,
  children,
  leaf,
}: {
  attributes: any;
  children: any;
  leaf: any;
}) {
  let el = <>{children}</>;

  if (leaf.bold) {
    el = <strong className="font-bold">{el}</strong>;
  }

  if (leaf.code) {
    el = <code className="text-pink-600">{el}</code>;
  }

  if (leaf.italic) {
    el = <em className="italic">{el}</em>;
  }

  if (leaf.underline) {
    el = <u className="underline-offset-1">{el}</u>;
  }

  return <span {...attributes}>{el}</span>;
}

function renderElement(props: CustomElement) {
  const { element, children, attributes } = props;
  switch (element.type) {
    case "paragraph":
      return <p {...attributes}>{children}</p>;
    case "h1":
      return <h1 {...attributes}>{children}</h1>;
    case "h2":
      return <h2 {...attributes}>{children}</h2>;
    case "h3":
      return <h3 {...attributes}>{children}</h3>;
    case "h4":
      return <h4 {...attributes}>{children}</h4>;
    default:
      // For the default case, we delegate to Slate's default rendering.
      return <DefaultElement {...props} />;
  }
}
