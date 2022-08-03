import { EXTREME } from "../constants";

export function searchAllPaths(edges) {
  let allPaths = [];
  let stack = [];
  const visited = new Map();

  stack.push(EXTREME.INIT);

  while (Array.isArray(stack) && stack.length > 0) {
    const target = stack[stack.length - 1];

    if (target === EXTREME.END) {
      allPaths.push(new Array(...stack));
      stack.pop();
    } else {
      const neighbours = searchNeighbours(target, edges);

      let nextTarget;
      //si no fue visitado
      if (!visited.get(target)) {
        nextTarget = neighbours.length > 1 ? neighbours[neighbours.length - 1] : neighbours[0];
        visited.set(target, neighbours.length);
        stack.push(nextTarget);
      } else {
        //si fue visitado, pero todavia tiene vecinos por recorrer
        if (visited.get(target) > 1) {
          let missingNeighbors = visited.get(target);
          missingNeighbors = missingNeighbors - 1;
          nextTarget = neighbours[missingNeighbors - 1];
          visited.set(target, missingNeighbors);
          stack.push(nextTarget);
        }
        //si ya fue visitado y no tiene mas vecinos...
        //comienzo a volver a ver si quedan otros caminos y lo marco como no visitado por si algun otro camino que pasa por el
        else {
          visited.delete(target);
          stack.pop();
        }
      }
    }
  }

  return allPaths;
}

export const searchNeighbours = (target, adjacencyList) => {
  return adjacencyList.reduce((partial, current) => (current[0] === target ? [...partial, current[1]] : partial), []);
};
