import Editor from "@monaco-editor/react";
import React from "react";

// CodeEditor component for displaying and editing Java code using Monaco Editor
const CodeEditor = ({ handleMount, setSourceCode, language }) => {
  return (
    <>
      <Editor
        height="70vh"
        width="70vw"
        defaultLanguage={language}
        onMount={handleMount}
        onChange={(value) => setSourceCode(value)} // Updates source code in real-time
      />
    </>
  );
};

export default CodeEditor;
