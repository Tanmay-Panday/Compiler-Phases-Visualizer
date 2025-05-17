import express from "express";
import { getJava3AC, getJavaCST, getJavaTokens, getPythonCST, getPythonTokens } from "../controllers/visualizerController.js";

const visualizerRouter = express.Router();

// JAVA RELATED ROUTES
visualizerRouter.post("/get-java-tokens", getJavaTokens); // to get all the tokens of a java source code
visualizerRouter.post("/get-java-cst", getJavaCST); // to get the parse-tree(cst) of a java source code
visualizerRouter.post("/get-java-3ac", getJava3AC); // to get all the 3AC of a java source code

// PYTHON RELATED ROUTES
visualizerRouter.post("/get-python-tokens", getPythonTokens); // to get all the tokens of a python source code
visualizerRouter.post("/get-python-cst", getPythonCST); // to get the parse-tree(cst) of a python source code
export default visualizerRouter;