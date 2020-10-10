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

// check if object is empty
export const isEmpty = (obj: any) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}