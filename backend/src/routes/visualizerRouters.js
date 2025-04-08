import express from "express";
import { getJavaCST, getJavaTokens } from "../controllers/visualizerController.js";

const visualizerRouter = express.Router();

// JAVA RELATED ROUTES
visualizerRouter.post("/get-java-tokens", getJavaTokens); // to get all the tokens of a java source code
visualizerRouter.post("/get-java-cst", getJavaCST); // to get all the parse-tree(cst) of a java source code

export default visualizerRouter;