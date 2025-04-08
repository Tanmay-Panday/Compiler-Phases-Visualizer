import {
  getCSTFromJavaSrcCode,
  getTokensFromJavaSrcCode,
} from "../utils/javaCompilerUtils.js";

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
