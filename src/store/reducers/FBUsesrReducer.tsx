import { FBUser } from "../types/FBUser";
import { FBUserActionTypes } from "../types/FBUser";

const fbUserReducerDefaultState: FBUser[] = [];

const fbUserReducer = (
  state = fbUserReducerDefaultState,
  action: FBUserActionTypes
): FBUser[] | any => {
  switch (action.type) {
    case "SAVE_FBUSER":
      console.log("saving from fb user")
      return [action.fbUser];
    case "DELETE_FBUSER":
      console.log("deleting from reducer");
      return [];
    default:
      return state;
  }
};

export { fbUserReducer };