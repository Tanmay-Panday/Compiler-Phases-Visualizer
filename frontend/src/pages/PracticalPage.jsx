import React from "react";
import CodeEditor from "../components/CodeEditor";
import axios from "axios";
import APIEndpoints from "../constants/APIEndpoints";
import JSONViewer from "../components/JSONViewer";
import TreeViewer from "../components/TreeViewer";
import { Button, Menu } from "@material-tailwind/react";
import InfoCard from "../components/InfoCard";
import PracticalPageInfo from "../constants/PracticalPageInfo";
import CodeConfigInfo from "../constants/CodeConfig";

const PracticalPage = () => {
  // data structures for the program
  const [sourceCode, setSourceCode] = React.useState(""); // source code of the program by user
  const [monacoInstance, setMonacoInstance] = React.useState(null); // monaco instance for the editor
  const editorRef = React.useRef(null); // Ref to store the Monaco Editor instance
  const [language, setLanguage] = React.useState("java"); // language selected by user
  const [fileName, setfileName] = React.useState(CodeConfigInfo.java.fileName); // file name of the program
  const [languageIcon, setLanguageIcon] = React.useState(
    CodeConfigInfo.java.icon
  ); // icon of the language
  const [phase1JsonTokens, setPhase1JsonTokens] = React.useState(""); // tokens generated from the source code
  const [phase2JsonCst, setPhase2JsonCst] = React.useState(""); // CST generated from the source code

  // ====================================================================================================

  // utilities for code editor ( phase 0 )
  // Handle Editor Mount
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    setMonacoInstance(monaco);
  };

  // function to handle language selection in dropdown menu
  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
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
  };
  //============================================================================================
  // useEffect for render management

  // Update fileName whenever language changes
  React.useEffect(() => {
    if (language === "java") {
      setfileName(CodeConfigInfo.java.fileName);
      setLanguageIcon(CodeConfigInfo.java.icon);
    } else if (language === "python") {
      setfileName(CodeConfigInfo.python.fileName);
      setLanguageIcon(CodeConfigInfo.python.icon);
    }
  }, [language]);

  return (
    <div>
      <div id="ph0" className="flex justify-around items-center">
        {/* Phase 0 - Write program */}
        <div className="h-[40vh] w-[20vw]">
          <InfoCard
            cardHeading={PracticalPageInfo.phase_zero_info.title}
            cardBody={PracticalPageInfo.phase_zero_info.description}
            cardImg={PracticalPageInfo.phase_zero_info.logo}
          />
        </div>
        <div>
          <span className="languageSelector flex justify-around ">
            {/* to display the selected language */}
            <span className="flex justify-between items-center">
              <span>File Name : {fileName}</span>
              <span>
                <img src={languageIcon} />
              </span>
            </span>
            {/* option for language selection */}
            <span>
              <select
                className="bg-gray-200 text-gray-700 border border-gray-300 rounded-md p-2"
                value={language}
                onChange={(e) => handleLanguageSelect(e.target.value)}
              >
                <option value="java">Java</option>
                <option value="python">Python</option>
                {/* Add more languages as needed */}
              </select>
            </span>
          </span>
          <CodeEditor
            handleMount={handleEditorDidMount}
            setSourceCode={setSourceCode}
            language={language}
          />
        </div>
        <div>
          <Button variant="outline" size="md">
            Compile
          </Button>
        </div>
      </div>
      <br />
      <hr />
      <div id="ph1">
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
      </div>
      <br />
      <hr />
      <div id="ph2">
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
    </div>
  );
};

export default PracticalPage;
