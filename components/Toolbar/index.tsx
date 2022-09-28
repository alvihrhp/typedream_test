import { useState, ReactNode, useCallback } from "react";
/** Component */
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
/** Icon */
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
/** Utils */
import {
  getActiveStyles,
  toggleStyle,
  getTextBlockStyle,
  toggleBlockType,
} from "../../utils/editorUtils";
/** Slate */
import { useSlateStatic } from "slate-react";

const PARAGRAPH_STYLES = ["h1", "h2", "h3", "h4", "paragraph", "multiple"];
const CHARACTER_STYLES = ["bold", "italic", "underline", "code"];

interface Props {
  selection?: any;
  previousSelection?: any;
}

const Toolbar: React.FC<Props> = ({ selection, previousSelection }) => {
  const editor = useSlateStatic();

  const onBlockTypeChange = useCallback(
    (targetType: any) => {
      if (targetType === "multiple") {
        return;
      }
      toggleBlockType(editor, targetType);
    },
    [editor]
  );

  const blockType = getTextBlockStyle(editor);

  return (
    <div className="relative w-full flex flex-wrap justify-between py-3 z-10">
      <DropdownButton
        className={"block-style-dropdown"}
        disabled={blockType == null}
        id="block-style"
        title={getLabelForBlockStyle(blockType ?? "paragraph")}
        style={{ margin: 0 }}
        onSelect={onBlockTypeChange}
      >
        {PARAGRAPH_STYLES.map((blockType) => (
          <Dropdown.Item eventKey={blockType} key={blockType}>
            {getLabelForBlockStyle(blockType)}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      {CHARACTER_STYLES.map((style) => (
        <ToolBarButton
          key={style}
          icon={getIconForButton(style)}
          isActive={getActiveStyles(editor).has(style)}
          onMouseDown={(event: any) => {
            event.preventDefault();
            toggleStyle(editor, style);
          }}
        />
      ))}
    </div>
  );
};

const getLabelForBlockStyle = (type: string): ReactNode => {
  return <span>{type}</span>;
};

const getIconForButton = (icon: any) => {
  return icon === "bold" ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      className="w-5 h-5"
    >
      <path d="M0 64C0 46.3 14.3 32 32 32H80 96 224c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H96 80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V256 96H32C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64H112V224H224zM112 288V416H256c35.3 0 64-28.7 64-64s-28.7-64-64-64H224 112z" />
    </svg>
  ) : icon === "italic" ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      className="w-5 h-5"
    >
      <path d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z" />
    </svg>
  ) : icon === "underline" ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className="w-5 h-5"
    >
      <path d="M16 64c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H128V224c0 53 43 96 96 96s96-43 96-96V96H304c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H384V224c0 88.4-71.6 160-160 160s-160-71.6-160-160V96H48C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      className="w-5 h-5"
    >
      <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
    </svg>
  );
};

function ToolBarButton(props: any) {
  const { icon, isActive, ...otherProps } = props;
  return (
    <Button
      variant="outline-primary"
      className="toolbar-btn"
      active={isActive}
      {...otherProps}
    >
      {icon}
    </Button>
  );
}

export default Toolbar;
