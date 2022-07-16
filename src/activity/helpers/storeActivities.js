export function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("activities", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

export function loadFromLocalStorage() {
  try {
    console.log(JSON.parse(localStorage.getItem("activities")));
    return JSON.parse(localStorage.getItem("activities")) || [];
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

export function clearLocalStorage() {
  try {
    localStorage.removeItem("activities");
  } catch (e) {
    console.warn(e);
  }
}
