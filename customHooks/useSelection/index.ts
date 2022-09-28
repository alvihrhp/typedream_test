import { useState, useCallback } from "react";
/** Deep Equal */
import areEqual from "deep-equal";

export default function useSelection(editor: any) {
  const [selection, setSelection] = useState(editor.selection);
  const setSelectionOptimized = useCallback(
    (newSelection: any) => {
      // don't update the component state if selection hasn't changed.
      if (areEqual(selection, newSelection)) {
        return;
      }
      setSelection(newSelection);
    },
    [setSelection, selection]
  );

  return [selection, setSelectionOptimized];
}
