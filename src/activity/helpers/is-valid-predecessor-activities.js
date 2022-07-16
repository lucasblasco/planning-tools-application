import { isSubArray } from "../../shared/helpers";

export const isValidPredecessorActivities = (activities) => {
  const activityNames = activities.map((row) => row.name);
  return activities
    .filter((activity) => activity.predecessor !== null)
    .every((activity) => (isSubArray(activityNames, activity.predecessor) ? true : false));
};
