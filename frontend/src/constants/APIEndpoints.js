const baseURL = "http://localhost:5000";

const APIEndpoints = {
    SAVE_JAVA_CODE: `${baseURL}/api/visualizer/save-java-code`,
    GET_JAVA_TOKENS: `${baseURL}/api/visualizer/get-java-tokens`,
    GET_JAVA_CST: `${baseURL}/api/visualizer/get-java-cst`,
    COMPILE_JAVA_CODE: `${baseURL}/api/visualizer/compile-java-code`,
    SAVE_PYTHON_CODE: `${baseURL}/api/visualizer/save-python-code`,
    GET_PYTHON_TOKENS: `${baseURL}/api/visualizer/get-python-tokens`,
    GET_PYTHON_CST: `${baseURL}/api/visualizer/get-python-cst`,
    COMPILE_PYTHON_CODE: `${baseURL}/api/visualizer/compile-python-code`,
};
export default APIEndpoints;
