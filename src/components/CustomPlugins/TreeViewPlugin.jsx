import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";

export default function TreeViewPlugin() {
  const [editor] = useLexicalComposerContext();
  return (
    <>
      <>
        <div>
          <div style={{
              marginRight:"10px"
            }}  class="d-flex m-10  justify-content-end">
            <button style={{
              marginRight:"10px"
            }} className="btn btn-secondary rounded-5">Cancle</button>
            <button className="btn btn-primary rounded-5">Create Card</button>
          </div>
        </div>
      </>
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
