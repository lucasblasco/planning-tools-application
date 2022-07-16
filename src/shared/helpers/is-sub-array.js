export const isSubArray = (arr, subarr) => {
  if (subarr == []) {
    return true;
  }
  return subarr.every((element) => (arr.includes(element) ? true : false));
};
