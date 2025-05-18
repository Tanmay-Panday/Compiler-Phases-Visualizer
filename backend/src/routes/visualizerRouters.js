import express from "express";
import {
  compileJavaCode,
  compilePythonCode,
  getJavaCST,
  getJavaIR,
  getJavaTC,
  getJavaTokens,
  getPythonCST,
  getPythonIR,
  getPythonTC,
  getPythonTokens,
  saveJavaCode,
  savePythonCode,
} from "../controllers/visualizerController.js";

const visualizerRouter = express.Router();

// JAVA RELATED ROUTES
visualizerRouter.post("/get-java-tokens", getJavaTokens); // to get all the tokens of a java source code
visualizerRouter.post("/get-java-cst", getJavaCST); // to get the parse-tree(cst) of a java source code
visualizerRouter.post("/save-java-code", saveJavaCode); // to save the java code to Main.java file in backend/Lexer_And_Parser/For_Java/temp directory
visualizerRouter.get("/compile-java-code", compileJavaCode); // to compile the saved Main.java file
visualizerRouter.get("/get-java-ir", getJavaIR); // to get the intermediate code representation of the java code
visualizerRouter.get("/get-java-tc", getJavaTC); // to get readable Target Code(Java Byte Code) of saved java program

// PYTHON RELATED ROUTES
visualizerRouter.post("/get-python-tokens", getPythonTokens); // to get all the tokens of a python source code
visualizerRouter.post("/get-python-cst", getPythonCST); // to get the parse-tree(cst) of a python source code
visualizerRouter.post("/save-python-code", savePythonCode); // to save the python code to main.py file in backend/Lexer_And_Parser/For_Python/temp directory
visualizerRouter.get("/compile-python-code", compilePythonCode); // to compile the saved main.py file
visualizerRouter.get("/get-python-ir", getPythonIR); // to get the intermediate code representation of the python code
visualizerRouter.get("/get-python-tc", getPythonTC); // to get readable Target Code(Python Byte Code) of saved python program

export default visualizerRouter;
