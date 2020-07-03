import { User } from "../types/User";
import { UserActionTypes } from "../types/User";

const userReducerDefaultState: User[] = [];

const userReducer = (state = userReducerDefaultState, action: UserActionTypes ): User[] => {
  switch (action.type){
    case "SAVE_USER":
      return [action.user];
    default:
      return state;
  }
}

export { userReducer };