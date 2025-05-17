import { Editor } from "@monaco-editor/react";
import React from "react";

// JSONViewer component for displaying JSON objects using Monaco Editor
const JSONViewer = ({
  currentJSONObject
}) => {
  return (
    <div>
      <Editor
        height="70vh"
        width="50vw"
        defaultLanguage="javascript"
        value={JSON.stringify(currentJSONObject, null, 2)}
        options={{
            readOnly: true, // Make the editor read-only
            autoIndent: "full", // Enable auto-indentation
            scrollbar:{
                vertical: "auto",
                horizontal: "auto",
                horizontalScrollbarSize: 10,
                verticalScrollbarSize: 10
            }
        }}
        
      />
    </div>
  );
};

export default JSONViewer;
