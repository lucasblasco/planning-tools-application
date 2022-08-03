import { EXTREME } from "../constants";
import { searchNeighbours } from "./search-route";

export const calculateForwardPass = (adjacencyList, activities) => {
  const forwardQueue = [];
  const backwardQueue = [];
  let activitiesWithDurations = [];

  const getEarlyFinishFromPredecessor = (node) => {
    if (node.predecessor === null) {
      return 0;
    }

    const activitiesProcessed = activitiesWithDurations.map((act) => act.name);
    const allPredecessorsWasProcessed = node.predecessor.every((predecessor) => activitiesProcessed.includes(predecessor));
    if (!allPredecessorsWasProcessed) {
      return undefined;
    }

    const greaterEarlyFinish = node.predecessor.reduce((max, current) => {
      const activity = activitiesWithDurations.find((activity) => activity.name === current);
      if (activity === undefined) {
        return;
      }
      if (activity && activity.earlyFinish > max) {
        return activity.earlyFinish;
      }
      return max;
    }, 0);
    return greaterEarlyFinish;
  };

  const rootNode = activities.find((activity) => activity.name === EXTREME.INIT);
  forwardQueue.push(rootNode);
  backwardQueue.push(rootNode);

  while (forwardQueue.length > 0) {
    let currentNode = forwardQueue[0];
    const earlyFinishPredecessor = getEarlyFinishFromPredecessor(currentNode);

    if (earlyFinishPredecessor === undefined) {
      //some predecessor was not processed yet, I put it last in the stack and I try later
      forwardQueue.shift();
      forwardQueue.push(currentNode);
    } else {
      currentNode = {
        ...currentNode,
        earlyStart: +earlyFinishPredecessor,
        earlyFinish: +earlyFinishPredecessor + Number(currentNode.duration),
      };

      if (!activitiesWithDurations.find((act) => act.id === currentNode.id)) {
        activitiesWithDurations.push(currentNode);

        const nextNode = searchNeighbours(currentNode.name, adjacencyList);
        if (nextNode.length > 0) {
          nextNode.forEach((element) => {
            const act = activities.find((activity) => activity.name === element);
            forwardQueue.push(act);
            backwardQueue.push(act);
          });
        }
      } else {
        activitiesWithDurations = activitiesWithDurations.map((act) => (act.id === currentNode.id ? currentNode : act));
      }

      forwardQueue.shift();
    }
  }

  const getLaterStartFromSuccessor = (node) => {
    const nextNode = searchNeighbours(node.name, adjacencyList);
    if (nextNode && nextNode.length === 0) {
      return node.earlyFinish;
    }
    const lowerLateStart = nextNode.reduce((min, current) => {
      const activity = activitiesWithDurations.find((activity) => activity.name === current);
      if (min === null || activity.lateStart < min) {
        return activity.lateStart;
      }
      return min;
    }, null);
    return lowerLateStart;
  };

  while (backwardQueue.length > 0) {
    let currentNode = backwardQueue.pop();
    const activityIndex = activitiesWithDurations.findIndex((act) => act.id === currentNode.id);
    const currentActivity = activitiesWithDurations[activityIndex];
    const lateStartSuccessor = getLaterStartFromSuccessor(currentActivity);

    activitiesWithDurations[activityIndex] = {
      ...currentActivity,
      lateStart: +lateStartSuccessor - Number(currentActivity.duration),
      lateFinish: +lateStartSuccessor,
      slack: +lateStartSuccessor - Number(currentActivity.earlyFinish),
    };
  }

  return activitiesWithDurations;
};
