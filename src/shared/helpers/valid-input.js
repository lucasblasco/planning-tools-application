export const validInput = (value) => {
  if (!value) {
    return false;
  }
  const valueString = String(value);
  if (valueString.trim().length === 0) {
    return false;
  }
  return true;
};
