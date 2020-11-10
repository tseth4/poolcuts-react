import { Dispatch } from "react";
import { AppState } from "..";
import { AppActions } from "../types";

export const loadSplashPage = (load: boolean): AppActions => {
  return {
    type: "LOAD_SPLASH_PAGE",
    loadPage: load,
  };
};

export const boundLoadPage = (load: boolean) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  console.log("bounding");
  dispatch(loadSplashPage(load));
};
