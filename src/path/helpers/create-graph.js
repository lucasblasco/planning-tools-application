import { extreme } from "../constants/extreme-nodes";

export const createGraph = (data) => {
  const edges = [];
  data
    .filter((activity) => activity.name !== extreme.INIT && activity.name !== extreme.END)
    .forEach((activity) => {
      if (activity.predecessor === null) {
        edges.push([extreme.INIT, activity.name]);
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

  emptyDestination.forEach((item) => edges.push([item, extreme.END]));

  return edges;
};
