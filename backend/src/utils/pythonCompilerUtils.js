import { CharStream, CommonTokenStream, InputStream, Token } from "antlr4";
import Python3Lexer from "../../Lexer_And_Parser/For_Python/Python3Lexer.js";
import Python3Parser from "../../Lexer_And_Parser/For_Python/Python3Parser.js";
import { parseTreeToJson } from "./globalUtils.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { promisify } from "util";
import { report } from "process";

// Helper Function to use Python3LEXER to get tokens in a readable format from a Python source code
export const getTokensFormPythonSrcCode = (src_code) => {
  // converting src code to input stream
  const inputStream = new InputStream(src_code);

  const lexer = new Python3Lexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  tokenStream.fill();

  const finalTokens = tokenStream.tokens;

  // converting tokens to a more readable format { type, text, line }
  const TokensObjectArray = finalTokens.map((token) => ({
    type: Python3Lexer.symbolicNames[token.type],
    text: token.text,
    line: token.line,
  }));

  return TokensObjectArray;
};

// Helper Function to use PYTHON3PARSER to get the JSON parse tree(Concrete Syntax Tree) from a Python source code
export const getCSTFromPythonSrcCode = (src_code) => {
  // converting src code to input stream
  const inputStream = new InputStream(src_code);
  const lexer = new Python3Lexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);

  const parser = new Python3Parser(tokenStream);
  parser.buildParseTrees = true;

  // Parse the input stream and get the parse tree
  // const tree = parser.compilationUnit();
  const tree = parser.file_input();

  // Convert the parse tree to JSON format
  const jsonTree = parseTreeToJson(tree, parser);
  return jsonTree;
};

// helper function to save the python code to main.py file
export const savePythonSourceCode = (src_code) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(
    `${__dirname}`,
    "..",
    "..",
    "Lexer_And_Parser",
    "For_Python",
    "temp",
    "main.py"
  ); // location where main.py file will be created
  // create a pyhton file called "main.py" in Lexer_And_Parser/For_Python/temp directory and pasting the src_code in it
  fs.writeFileSync(filePath, src_code, "utf-8");
  console.log(`main.py file created at path ${filePath}`);
};

const execAsync = promisify(exec);
// helper function to compile the python code
export const compilePythonSourceCode = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "Lexer_And_Parser",
    "For_Python",
    "temp",
    "main.py"
  );

  // Step 1: Run pylint for semantic checks
  try {
    await execAsync(`pylint "${filePath}" --disable=all --enable=E`);
  } catch (error) {
    return {
      success: false,
      message: "Pylint reported semantic errors",
      report: error.stdout || error.stderr || error.message,
    };
  }

  // Step 2: If pylint passes, run py_compile for syntax errors
  try {
    await execAsync(`python -m py_compile "${filePath}"`);
    return {
      success: true,
      message: "Pylint passed and syntax is valid (compiled successfully)",
      report: "Compilation successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "Syntax error detected during compilation",
      report: error.stderr || error.message,
    };
  }
};

// helper function to get the IR of the python byte code
export const getIRFromPythonSrcCode = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const pythonScriptPath = path.join(
    __dirname,
    "..",
    "..",
    "Lexer_And_Parser",
    "For_Python",
    "temp",
    "irShower.py"
  );

  try {
    const { stdout, stderr } = await execAsync(`python "${pythonScriptPath}"`);
    return {
      success: true,
      message: "IR generated successfully",
      report: "IR was generated for Python Bytecode file .pyc",
      code: stdout,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to generate IR",
      report: error.stdout || error.stderr || error.message,
      code: null,
    };
  }
};

// helper function to get the IR of the python byte code
export const getTCFromPythonSrcCode = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const pythonScriptPath = path.join(
    __dirname,
    "..",
    "..",
    "Lexer_And_Parser",
    "For_Python",
    "temp",
    "readableByteCodeShower.py"
  );

  try {
    const { stdout, stderr } = await execAsync(`python "${pythonScriptPath}"`);
    return {
      success: true,
      message: "TC generated successfully",
      report: "Readable Target Code(Python Bytecode) was generated",
      code: stdout,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to generate TC",
      report: error.stdout || error.stderr || error.message,
      code: null,
    };
  }
};