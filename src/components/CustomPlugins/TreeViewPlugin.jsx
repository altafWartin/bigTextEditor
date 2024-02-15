import React, { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";

export default function TreeViewPlugin() {
  const [editor] = useLexicalComposerContext();
  console.log("tree view", editor);

  // Load the saved data from localStorage on component mount
  useEffect(() => {
    const savedEditorContent = localStorage.getItem("editorContent");

    if (savedEditorContent) {
      // Set the editor content if it exists
      editor.setContent(savedEditorContent);
    }
  }, [editor]);

  // Save the editor content to localStorage on component unmount
  useEffect(() => {
    const saveEditorContent = () => {
      const editorContent = editor.getContent();
      localStorage.setItem("editorContent", editorContent);
    };

    window.addEventListener("beforeunload", saveEditorContent);

    return () => {
      window.removeEventListener("beforeunload", saveEditorContent);
    };
  }, [editor]);

  console.log("tree view", editor);

  return (
    <>
      {/* <TreeView
        sx={{ paddingTop: "100px" }}
        viewClassName="tree-view-output"
        timeTravelPanelClassName="debug-timetravel-panel"
        timeTravelButtonClassName="debug-timetravel-button"
        timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
        timeTravelPanelButtonClassName="debug-timetravel-panel-button"
        editor={editor}
      /> */}
    </>
  );
}
