// Store redux into local storage
export const SaveToLocalStorageFn = (state: any) => {
  try {
    const serilizedState = JSON.stringify(state);
    sessionStorage.setItem("state_zendesign", serilizedState);
  } catch (error) {
    console.log(error);
  }
};

// Retrive state from local storage to redux store
export const LoadFromLocalStorageFn = () => {
  try {
    const serilizedState = sessionStorage.getItem("state_zendesign");
    if (serilizedState === null) return undefined;
    return JSON.parse(serilizedState);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};