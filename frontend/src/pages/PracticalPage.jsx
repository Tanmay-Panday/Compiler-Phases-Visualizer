import React from "react";
import CodeEditor from "../components/CodeEditor";
import axios from "axios";
import APIEndpoints from "../constants/APIEndpoints";
import JSONViewer from "../components/JSONViewer";
import TreeViewer from "../components/TreeViewer";
const PracticalPage = () => {
  // data structures for the program
  const [sourceCode, setSourceCode] = React.useState(""); // source code of the program by user
  const [monacoInstance, setMonacoInstance] = React.useState(null); // monaco instance for the editor
  const editorRef = React.useRef(null); // Ref to store the Monaco Editor instance
  const [phase1JsonTokens, setPhase1JsonTokens] = React.useState(""); // tokens generated from the source code
  const [phase2JsonCst, setPhase2JsonCst] = React.useState(""); // CST generated from the source code

  // ====================================================================================================

  // utilities for code editor ( phase 0 )
  // Handle Editor Mount
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    setMonacoInstance(monaco);
  };

  // ------------------------------------------------------------------------------

  // uitlities for tokenization (Phase 1 - Lexical Analysis)
  // function to getTokens of src-code from backend-api and store them in phase1JsonTokens
  const getTokensinJson = async (code) => {
    try {
      const response = await axios.post(APIEndpoints.GET_JAVA_TOKENS, {
        src_code: code,
      });
      if (response.status !== 200) {
        console.log(response.data.message);
        return;
      } else {
        console.log(response.data.message);
      }
      setPhase1JsonTokens(response.data.tokensArray);
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  };

  // Handle Tokenization (Phase 1 - Lexical Analysis)
  const handleTokenization = () => {
    if (!monacoInstance) {
      alert("Monaco is not loaded yet!");
      return;
    }

    // update source_code with current value of editor
    const code = editorRef.current.getValue();
    setSourceCode(code);

    // Get tokens using backend api
    getTokensinJson(sourceCode);
    console.log("Tokens:", phase1JsonTokens);

    // Display tokens in the jsonTokens div

    // // Display tokens
  };

  // ------------------------------------------------------------------------------
  // utilities for parsing (Phase 2 - Syntax Analysis)
  // function to getCST of a src-code from backend-api and store them in phase2JsonCst
  const getCST = async (code) => {
    try {
      const response = await axios.post(APIEndpoints.GET_JAVA_CST, {
        src_code: code,
      });
      if (response.status !== 200) {
        console.log(response.data.message);
        return;
      } else {
        console.log(response.data.message);
      }
      setPhase2JsonCst(response.data.cst);
    } catch (error) {
      console.error("Error fetching CST:", error);
    }
  };

  // Handle Parsing (Phase 2 - Syntax Analysis)
  const handleParsing = () => {
    if (!monacoInstance) {
      alert("Monaco is not loaded yet!");
      return;
    }

    // update source_code with current value of editor
    const code = editorRef.current.getValue();
    setSourceCode(code);

    // Get CST using backend api
    getCST(sourceCode);
    console.log("CST:", phase2JsonCst);

    // Display CST in the visualAST div
  }
  //============================================================================================
  // useEffect for render management

  return (
    <div>
      {/* Phase 0 - Write program */}
      <CodeEditor
        handleMount={handleEditorDidMount}
        setSourceCode={setSourceCode}
      />

      {/* Phase 1 - Tokenization */}
      <button onClick={handleTokenization}>Lexical Analysis</button>
      {/* Display tokens in JSON format */}
      {phase1JsonTokens && (
        <div className="bg-amber-200">
          <h2 className="text-2xl font-bold">Tokens</h2>
          <JSONViewer
            currentJSONObject={phase1JsonTokens}
            width="50%"
            height="50vh"
          />
        </div>
      )}
      
      <br />
      <hr />

      {/* Phase 2 - Parsing */}
      <button onClick={handleParsing}>Syntax Analysis</button>
      {/* Display CST in Tree-format */}
      {phase2JsonCst && (
        <div>
          <h2 className="text-2xl font-bold">CST</h2>
          <TreeViewer jsonTree={phase2JsonCst} height="80vh" width="auto" />
        </div>
      )}
    </div>
  );
};

export default PracticalPage;
