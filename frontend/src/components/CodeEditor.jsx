import Editor from "@monaco-editor/react";
import React from "react";

// CodeEditor component for displaying and editing Java code using Monaco Editor
const CodeEditor = ({ handleMount, setSourceCode }) => {
  return (
    <div>
      <Editor
        height="90vh"
        defaultLanguage="java"
        onMount={handleMount}
        onChange={(value) => setSourceCode(value)} // Updates source code in real-time
      />
    </div>
  );
};

export default CodeEditor;
