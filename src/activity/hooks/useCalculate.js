import { useState } from "react";
import { EXTREME } from "../../path/constants";
import { calculateEndPredecessor, calculateForwardPass, createGraph } from "../../path/helpers";
import { isValidPredecessorActivities } from "../helpers";

export const useCalculate = () => {
  const [links, setLinks] = useState([]);
  const [paths, setPaths] = useState([]);
  const [processedActivities, setProcessedActivities] = useState([]);
  const [error, setError] = useState(null);

  const onCalculate = (activities) => {
    setError(null);
    if (!isValidPredecessorActivities(activities)) {
      setError("Existe una/s actividad predecesora que no es válida");
      return;
    }

    const { edges, paths } = createGraph(activities);

    setLinks(edges);
    setPaths(paths);
    const endPredecessors = calculateEndPredecessor(paths);

    const completeEndActivity = { ...activities.find((act) => act.name === EXTREME.END), ["predecessor"]: endPredecessors };
    const completeActivities = activities.map((activity) => (activity.id === completeEndActivity.id ? completeEndActivity : activity));

    const processed = calculateForwardPass(edges, completeActivities);
    setProcessedActivities(processed);
  };

  return {
    links,
    paths,
    processedActivities,
    error,
    onCalculate,
  };
};
