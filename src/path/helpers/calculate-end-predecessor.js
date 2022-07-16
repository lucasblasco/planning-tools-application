import { extreme } from "../constants";

export const calculateEndPredecessor = (paths) => {
  const predecessors = [];

  paths.forEach((path) => {
    const endIndex = path.findIndex((item) => item === extreme.END);
    if (endIndex > 0) {
      const previousNode = path[endIndex - 1];
      if (typeof previousNode !== "undefined" && !predecessors.includes(previousNode)) {
        predecessors.push(previousNode);
      }
    }
  });
  return predecessors;
};
