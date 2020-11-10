import { SplashPageTypes } from "../types/SplashPageTypes";

const splashPageReducerState: boolean = true;
const splashPageReducer = (
  state = splashPageReducerState,
  action: SplashPageTypes
): boolean | any => {
  switch (action.type) {
    case "LOAD_SPLASH_PAGE":
      console.log(action.loadPage)
      return action.loadPage;
    case "UNLOAD_SPLASH_PAGE":
      return action.loadPage;
    default:
      return state;
  }
};
export { splashPageReducer };
