import { EXTREME } from "../constants";
import { searchAllPaths } from "./search-route";

export const createGraph = (data) => {
  const edges = [];
  data
    .filter((activity) => activity.name !== EXTREME.INIT && activity.name !== EXTREME.END)
    .forEach((activity) => {
      if (activity.predecessor === null) {
        edges.push([EXTREME.INIT, activity.name]);
      } else {
        activity.predecessor.forEach((predecessor) => {
          edges.push([predecessor, activity.name]);
        });
      }
    });

  const origins = edges.map((edge) => edge[0]);
  const emptyDestination = edges.reduce(
    (dest, current) => (origins.includes(current[1]) || dest.includes(current[1]) ? dest : [...dest, current[1]]),
    []
  );

  emptyDestination.forEach((item) => edges.push([item, EXTREME.END]));

  const paths = searchAllPaths(edges);

  return { edges, paths };
};
