import { CharStream, CommonTokenStream, InputStream, Token } from "antlr4";
import Python3Lexer from '../../Lexer_And_Parser/For_Python/Python3Lexer.js';
import Python3Parser from '../../Lexer_And_Parser/For_Python/Python3Parser.js';
import { parseTreeToJson } from "./globalUtils.js";


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
}

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
}
