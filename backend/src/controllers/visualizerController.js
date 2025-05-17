import {
  compileJavaSourceCode,
  getCSTFromJavaSrcCode,
  getTokensFromJavaSrcCode,
  saveJavaSourceCode,
} from "../utils/javaCompilerUtils.js";

import {
  compilePythonSourceCode,
  getCSTFromPythonSrcCode,
  getTokensFormPythonSrcCode,
  savePythonSourceCode,
} from "../utils/pythonCompilerUtils.js";

//@description To get all the tokens of a java program
//@type POST request
//@route /api/visualizer/get-java-tokens
//@dataRecievedFrom {req.body.src_code}
/*
Responses: 
    status code:400 ( Bad Request if no source code is provided )   message: "Source code not specified"
    status code:200 ( Success )   message: "Tokens have been fetched" , tokensArray: [ { type, text, line } ]
    status code:500 ( Internal Server Error if something goes wrong on the server )   message: "Internal server error"
*/
export const getJavaTokens = async (req, res) => {
  try {
    const { src_code } = req.body; // get source code from request body
    if (!src_code) {
      return res.status(400).json({ message: "Source code not specified" });
    }
    const tokensArray = getTokensFromJavaSrcCode(src_code); // get tokens from source code
    res.status(200).json({
      message: "Tokens have been fetched",
      NumberOfTokens: tokensArray.length,
      tokensArray,
    });
  } catch (error) {
    console.error(error);
    // 500 Internal Server Error if something goes wrong on the server
    res.status(500).json({ message: "Internal server error" });
  }
};

//@description To get all the parse-tree(cst) of a java program
//@type POST request
//@route /api/visualizer/get-java-cst
//@dataRecievedFrom {req.body.src_code}
/*
Responses: 
    status code:400 ( Bad Request if no source code is provided )   message: "Source code not specified"
    status code:200 ( Success )   message: "Parse tree has been fetched" , cst: { name, children: [ { name, children: [ ... ] } ] }
    status code:500 ( Internal Server Error if something goes wrong on the server )   message: "Internal server error"
*/
export const getJavaCST = async (req, res) => {
  try {
    const { src_code } = req.body; // get source code from request body
    if (!src_code) {
      return res.status(400).json({ message: "Source code not specified" });
    }
    const cst = getCSTFromJavaSrcCode(src_code); // get parse tree from source code
    res.status(200).json({
      message: "Parse tree has been fetched",
      cst,
    });
  } catch (error) {
    console.error(error);
    // 500 Internal Server Error if something goes wrong on the server
    res.status(500).json({ message: "Internal server error" });
  }
};

//@description To save the java code to Main.java file
//@type POST request
//@route /api/visualizer/save-java-code
//@dataRecievedFrom {req.body.src_code}
export const saveJavaCode = async (req, res) => {
  try {
    const { src_code } = req.body; // get source code from request body
    if (!src_code) {
      return res.status(400).json({ message: "Source code not specified" });
    }
    // get threeACJava from source code
    const savedCode = saveJavaSourceCode(src_code);
    res.status(200).json({
      message: "Java Source Code has been saved",
    });
  } catch (error) {
    console.error(error);
    // 500 Internal Server Error if something goes wrong on the server
    res.status(500).json({ message: "Internal server error" });
  }
};

//@description To compile the saved Main.java file
//@type GET request
//@route /api/visualizer/compile-java-code
/*
Responses:
    status code:200 ( Success )   CompilationResult: { success: true, message: "Compilation successful" } || { success: false, message: error message }
    status code:500 ( Internal Server Error if something goes wrong on the server )   message: "Internal server error"
*/
export const compileJavaCode = async (req, res) => {
  try {
    const compileResult = await compileJavaSourceCode(); // Note the await
    res.status(200).json({ compileResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// ======================================================================================================================

// @description To get all the tokens of a python program
// @type POST request
// @route /api/visualizer/get-python-tokens
// @dataRecievedFrom {req.body.src_code}
/*
Responses: 
    status code:400 ( Bad Request if no source code is provided )   message: "Source code not specified"
    status code:200 ( Success )   message: "Tokens have been fetched" , tokensArray: [ { type, text, line } ]
    status code:500 ( Internal Server Error if something goes wrong on the server )   message: "Internal server error"
*/
export const getPythonTokens = async (req, res) => {
  try {
    const { src_code } = req.body; // get source code from request body
    if (!src_code) {
      return res.status(400).json({ message: "Source code not specified" });
    }
    const tokensArray = getTokensFormPythonSrcCode(src_code); // get tokens from source code
    res.status(200).json({
      message: "Tokens have been fetched",
      NumberOfTokens: tokensArray.length,
      tokensArray,
    });
  } catch (error) {
    console.error(error);
    // 500 Internal Server Error if something goes wrong on the server
    res.status(500).json({ message: "Internal server error" });
  }
};

//@description To get all the parse-tree(cst) of a python program
//@type POST request
//@route /api/visualizer/get-python-cst
//@dataRecievedFrom {req.body.src_code}
/*
Responses: 
    status code:400 ( Bad Request if no source code is provided )   message: "Source code not specified"
    status code:200 ( Success )   message: "Parse tree has been fetched" , cst: { name, children: [ { name, children: [ ... ] } ] }
    status code:500 ( Internal Server Error if something goes wrong on the server )   message: "Internal server error"
*/
export const getPythonCST = async (req, res) => {
  try {
    const { src_code } = req.body; // get source code from request body
    if (!src_code) {
      return res.status(400).json({ message: "Source code not specified" });
    }
    const cst = getCSTFromPythonSrcCode(src_code); // get parse tree from source code
    res.status(200).json({
      message: "Parse tree has been fetched",
      cst,
    });
  } catch (error) {
    console.error(error);
    // 500 Internal Server Error if something goes wrong on the server
    res.status(500).json({ message: "Internal server error" });
  }
};

//@description To save the python code to main.py file
//@type POST request
//@route /api/visualizer/save-python-code
//@dataRecievedFrom {req.body.src_code}
export const savePythonCode = async (req, res) => {
  try {
    const { src_code } = req.body; // get source code from request body
    if (!src_code) {
      return res.status(400).json({ message: "Source code not specified" });
    }
    const savedCode = savePythonSourceCode(src_code);
    res.status(200).json({
      message: "Python Source Code has been saved",
    });
  } catch (error) {
    console.error(error);
    // 500 Internal Server Error if something goes wrong on the server
    res.status(500).json({ message: "Internal server error" });
  }
};


//@description To compile the saved main.py file
//@type GET request
//@route /api/visualizer/compile-python-code
/*
Responses:
    status code:200 ( Success )   CompilationResult: { success: true, message: "Compilation successful" } || { success: false, message: error message }
    status code:500 ( Internal Server Error if something goes wrong on the server )   message: "Internal server error"
*/
export const compilePythonCode = async (req, res) => {
  try {
    const compileResult = await compilePythonSourceCode();
    res.status(200).json({ compileResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};