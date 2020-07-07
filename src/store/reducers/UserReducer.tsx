import { User } from "../types/User";
import { UserActionTypes } from "../types/User";

const userReducerDefaultState: User[] = [];

const userReducer = (
  state = userReducerDefaultState,
  action: UserActionTypes
): User[] | any => {
  switch (action.type) {
    case "SAVE_USER":
      return [action.user];
    case "DELETE_USER":
      // console.log(action)
      return [];
    default:
      return state;
  }
};

export { userReducer };
