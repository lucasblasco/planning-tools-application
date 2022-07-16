export const includeAllItems = (source, destination) => {
  for (var i = 0, len = source.length; i < len; i++) {
    if (!destination.includes(source[i])) {
      return false;
    }
  }
  return true;
};
