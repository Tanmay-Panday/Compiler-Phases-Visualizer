import React from "react";
import Tree from "react-d3-tree";

// This component is used to visualize a JSON tree structure using the react-d3-tree library.
const TreeViewer = ({ jsonTree , width, height}) => {
  return (
    <div style={{ width: width, height: height, backgroundColor:"lightcyan" }}>
      <Tree data={jsonTree} orientation="vertical" pathFunc={"diagonal"} separation={{
        siblings: 2,
        nonSiblings: 3,
      }} />
    </div>
  );
};

export default TreeViewer;
