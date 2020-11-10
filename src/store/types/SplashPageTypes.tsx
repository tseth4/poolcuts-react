export interface LoadPage {
  loadPage: boolean;
}

export const LOAD_SPLASH_PAGE = "LOAD_SPLASH_PAGE";
export const UNLOAD_SPLASH_PAGE = "UNLOAD_SPLASH_PAGE";

export interface LoadSplashPage {
  type: typeof LOAD_SPLASH_PAGE;
  loadPage: boolean
}

export interface UnloadSplashPage {
  type: typeof UNLOAD_SPLASH_PAGE;
  loadPage: boolean
}

export type SplashPageTypes = LoadSplashPage | UnloadSplashPage;