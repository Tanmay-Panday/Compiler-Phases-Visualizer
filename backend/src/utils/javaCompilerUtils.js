import { CharStream, CommonTokenStream, InputStream, Token } from "antlr4";
import Java20Lexer from "../../Lexer_And_Parser/For_Java/Java20Lexer.js";
import Java20Parser from "../../Lexer_And_Parser/For_Java/Java20Parser.js";
import { parseTreeToJson } from "./globalUtils.js";
import fs from "fs";
import fsPromises from 'fs/promises'
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { promisify } from "util";

// Helper Function to use JAVA20LEXER to get tokens in a readable format from a Java source code
export const getTokensFromJavaSrcCode = (src_code) => {
  // converting src code to input stream
  const inputStream = new InputStream(src_code);

  const lexer = new Java20Lexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  tokenStream.fill();

  const finalTokens = tokenStream.tokens;

  // converting tokens to a more readable format { type, text, line }
  const TokensObjectArray = finalTokens.map((token) => ({
    type: Java20Lexer.symbolicNames[token.type],
    text: token.text,
    line: token.line,
  }));

  return TokensObjectArray;
};

// Helper Function to use JAVA20PARSER to get the JSON parse tree(Concrete Syntax Tree) from a Java source code
export const getCSTFromJavaSrcCode = (src_code) => {
  // converting src code to input stream
  const inputStream = new InputStream(src_code);
  const lexer = new Java20Lexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);

  const parser = new Java20Parser(tokenStream);
  parser.buildParseTrees = true;
  // Parse the input stream and get the parse tree
  const tree = parser.compilationUnit();

  // Convert the parse tree to JSON format
  const jsonTree = parseTreeToJson(tree, parser);
  return jsonTree;
};

// helper function to save the java code to Main.java file
export const saveJavaSourceCode = (src_code) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(
    `${__dirname}`,
    "..",
    "..",
    "Lexer_And_Parser",
    "For_Java",
    "temp",
    "Main.java"
  ); // location where Main.java file will be created
  // create a java file called "Main.java" in Lexer_And_Parser/For_Java/temp directory and pasting the src_code in it
  fs.writeFileSync(filePath, src_code, "utf-8");
  console.log(`Main.java file created at path ${filePath}`);
};

const execAsync = promisify(exec);
// helper function to compile the java source code(Main.java) file and check whether it is compiled successfully or not
export const compileJavaSourceCode = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "Lexer_And_Parser",
    "For_Java",
    "temp",
    "Main.java"
  );

  try {
    await execAsync(`javac "${filePath}"`);
    return {
      success: true,
      message: "Main.java compiled to Main.class successfully",
      report: "Compilation successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "Compilation failed",
      report: error.stderr || error.message,
    };
  }
};

//helper function to get Jimple code from Main.class file
export const getJimpleCode = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const tempDir = path.join(
    __dirname,
    "..",
    "..",
    "Lexer_And_Parser",
    "For_Java",
    "temp"
  );
  const sootJarFile = `soot-4.6.0-jar-with-dependencies.jar`;
  const targetClassName = `Main`; // Main.class file will be convberted to Jimple code
  const outputFilePath = path.join(
    tempDir,
    "sootOutput",
    `${targetClassName}.jimple`
  );

  const command = `cd ${tempDir} && java -cp ${sootJarFile} soot.Main -cp . -pp -f jimple ${targetClassName}`;
  try {
    const { stdout, stderr } = await execAsync(command);
    const jimpleCode = await fsPromises.readFile(outputFilePath, "utf-8");
    return {
      success: true,
      message: "Jimple code generated successfully",
      report: stdout || stderr,
      code: jimpleCode,
    };
  } catch (error) {
    return {
      success: false,
      message: "Jimple code generation failed",
      report: error.stderr || error.message,
      code: null,
    };
  }
};

// helper function to get the Readable format of the java byte code
export const getReadableJavaByteCode = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const tempDir = path.join(
    __dirname,
    "..",
    "..",
    "Lexer_And_Parser",
    "For_Java",
    "temp"
  );
  const targetClassName = `Main`; // Main.class file will be convberted to Jimple code
  const command = `cd ${tempDir} && javap -c ${targetClassName}.class`;
  try {
    const { stdout, stderr } = await execAsync(command);
    return {
      success: true,
      message: "Readable Java bytecode generated successfully",
      report: "Readable bytecode generated from Main.class",
      code: stdout,
    };
  } catch (error) {
    return {
      success: false,
      message: "Readable Java bytecode generation failed",
      report: error.stderr || error.message,
      code: null,
    };
  }
};
