import React from "react";
import CodeEditor from "../components/CodeEditor";
import axios from "axios";
import APIEndpoints from "../constants/APIEndpoints";
import JSONViewer from "../components/JSONViewer";
import TreeViewer from "../components/TreeViewer";
import { Button, Card, Menu, Typography } from "@material-tailwind/react";
import InfoCard from "../components/InfoCard";
import PracticalPageInfo from "../constants/PracticalPageInfo";
import CodeConfigInfo from "../constants/CodeConfig";
import { toast, ToastContainer } from "react-toastify";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";

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

  // API endpoints for the program
  const [phase0Api, setPhase0Api] = React.useState(APIEndpoints.SAVE_JAVA_CODE); // API endpoint for phase 0
  const [phase1API, setPhase1API] = React.useState(
    APIEndpoints.GET_JAVA_TOKENS
  );
  const [phase2API, setPhase2API] = React.useState(APIEndpoints.GET_JAVA_CST); // API endpoint for phase 2
  const [phase3API, setPhase3API] = React.useState(
    APIEndpoints.COMPILE_JAVA_CODE
  ); // API endpoint for phase 3

  const [phase1JsonTokens, setPhase1JsonTokens] = React.useState(""); // tokens generated from the source code
  const [phase2JsonCst, setPhase2JsonCst] = React.useState(""); // CST generated from the source code
  const [phase3Response, setPhase3Response] = React.useState(""); // response from the backend for phase 3

  const [phase3Loading, setPhase3Loading] = React.useState(false); // loading state for phase 3
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

  const handleFileSave = async () => {
    try {
      const response = await axios.post(phase0Api, {
        src_code: sourceCode,
      });
      if (response.status !== 200) {
        console.log(response.data.message);
        return;
      }
      toast.success(`${fileName} has been saved successfully!`);
      console.log("Save Response:", response.data);
    } catch (error) {
      console.log(`Error while saving file: ${error}`);
    }
  };

  // ------------------------------------------------------------------------------

  // uitlities for tokenization (Phase 1 - Lexical Analysis)
  // function to getTokens of src-code from backend-api and store them in phase1JsonTokens
  const getTokensinJson = async (code) => {
    try {
      const response = await axios.post(phase1API, {
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
      const response = await axios.post(phase2API, {
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

  // ------------------------------------------------------------------------------------------------
  // utilities for semantic analysis (Phase 3 - Semantic Analysis)

  // function to compile the saved program file and get the response from backend
  const handleCompileCode = async () => {
    try {
      setPhase3Loading(true);
      const response = await axios.get(phase3API);
      if (response.status !== 200) {
        console.log(response.data.message);
        setPhase3Loading(false);
        return;
      }
      setPhase3Response(response.data.compileResult);
    } catch (error) {
      console.log(`Error while compiling code: ${error}`);
    } finally {
      setPhase3Loading(false);
    }
  };
  //============================================================================================
  // useEffect for render management

  // Update fileName whenever language changes
  React.useEffect(() => {
    if (language === "java") {
      setfileName(CodeConfigInfo.java.fileName);
      setLanguageIcon(CodeConfigInfo.java.icon);
      setPhase0Api(APIEndpoints.SAVE_JAVA_CODE);
      setPhase1API(APIEndpoints.GET_JAVA_TOKENS);
      setPhase2API(APIEndpoints.GET_JAVA_CST);
      setPhase3API(APIEndpoints.COMPILE_JAVA_CODE);
    } else if (language === "python") {
      setfileName(CodeConfigInfo.python.fileName);
      setLanguageIcon(CodeConfigInfo.python.icon);
      setPhase0Api(APIEndpoints.SAVE_PYTHON_CODE);
      setPhase1API(APIEndpoints.GET_PYTHON_TOKENS);
      setPhase2API(APIEndpoints.GET_PYTHON_CST);
      setPhase3API(APIEndpoints.COMPILE_PYTHON_CODE);
    }
  }, [language]);

  return (
    <div>
      <ToastContainer />
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
          <Button variant="outline" size="md" onClick={handleFileSave}>
            Save as {fileName}
          </Button>
        </div>
      </div>

      <br />
      <br />
      <hr />

      <div id="ph1" className="flex justify-around items-center">
        {/* Phase 1 - Tokenization */}
        <div>
          <InfoCard
            cardHeading={PracticalPageInfo.phase_one_info.title}
            cardBody={PracticalPageInfo.phase_one_info.description}
            cardImg={PracticalPageInfo.phase_one_info.logo}
          />
        </div>
        <div>
          <Button onClick={handleTokenization}>Lexical Analysis</Button>
        </div>
        <div>
          {/* Display tokens in JSON format */}
          {phase1JsonTokens && (
            <div className="bg-blue-400 rounded-lg">
              <h2 className="text-2xl font-bold">Generated Tokens</h2>
              <JSONViewer
                currentJSONObject={phase1JsonTokens}
                width="50vw"
                height="50vh"
              />
            </div>
          )}
        </div>
      </div>

      <br />
      <br />
      <hr />

      <div id="ph2" className="flex justify-around items-center">
        {/* Phase 2 - Parsing */}
        <div>
          <InfoCard
            cardHeading={PracticalPageInfo.phase_two_info.title}
            cardBody={PracticalPageInfo.phase_two_info.description}
            cardImg={PracticalPageInfo.phase_two_info.logo}
          />
        </div>
        <div>
          <Button onClick={handleParsing}>Syntax Analysis</Button>
        </div>
        {/* Display CST in Tree-format */}
        <div>
          {phase2JsonCst && (
            <div>
              <h2 className="text-2xl font-bold">
                Concrete Syntax Tree ( C S T )
              </h2>
              <TreeViewer jsonTree={phase2JsonCst} height="70vh" width="50vw" />
            </div>
          )}
        </div>
      </div>

      <br />
      <br />
      <hr />
      <div id="ph3" className="flex justify-evenly items-center">
        {/* Phase 3 - Semantic Analysis */}
        <div>
          <InfoCard
            cardHeading={PracticalPageInfo.phase_three_info.title}
            cardBody={PracticalPageInfo.phase_three_info.description}
            cardImg={PracticalPageInfo.phase_three_info.logo}
          />
        </div>
        <div>
          <Button onClick={handleCompileCode}>Semantic Analysis</Button>
        </div>
        <div className="w-sm h-auto flex-col max-w-md">
          <Typography type="h3" color="primary">
            Compilation Status
          </Typography>

          {/* while phase3Loading is true showing loading spinner in place of the below div */}
          {phase3Loading ? (
            <div className="flex justify-center items-center">
              <Trefoil />
            </div>
          ) : (
            <div className=" flex-col">
              {/* success status */}
              <div id="success" className="flex gap-5">
                <Typography type="h5" color="info">
                  Success Status :
                </Typography>
                {phase3Response && (
                  <span>
                    {phase3Response.success ? (
                      <Typography type="h6" color="success">
                        No Error Occured
                      </Typography>
                    ) : (
                      <Typography type="h6" color="error">
                        Error Occured
                      </Typography>
                    )}
                  </span>
                )}
              </div>

              {/* Message Recieved */}
              <div id="message" className="flex gap-5">
                <Typography type="h5" color="info">
                  Message :
                </Typography>
                {phase3Response && (
                  <Typography
                    type="h6"
                    color={phase3Response.success ? "success" : "error"}
                  >
                    {phase3Response.message}
                  </Typography>
                )}
              </div>

              {/* Compilation Result */}
              <div id="report" className="flex gap-5">
                <Typography type="h5" color="info">
                  Report :
                </Typography>
                {phase3Response && (
                  <Typography
                    type="h6"
                    color={phase3Response.success ? "success" : "error"}
                  >
                    {phase3Response.report}
                  </Typography>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticalPage;
