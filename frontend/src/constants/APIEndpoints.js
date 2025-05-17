const baseURL = `http://localhost:5000`;

const APIEndpoints = {
    GET_JAVA_TOKENS: `${baseURL}/api/visualizer/get-java-tokens`,
    GET_JAVA_CST: `${baseURL}/api/visualizer/get-java-cst`,
    GET_PYTHON_TOKENS: `${baseURL}/api/visualizer/get-python-tokens`,
    GET_PYTHON_CST: `${baseURL}/api/visualizer/get-python-cst`,
}
export default APIEndpoints;