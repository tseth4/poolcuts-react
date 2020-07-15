import { Error, ErrorActionTypes } from '../types/Error';


const errorReducerDefaultState: Error[] = []

const errorReducer = (state = errorReducerDefaultState, action: ErrorActionTypes ): Error[] | any => {
  switch (action.type){
    case "SAVE_ERROR":
      return [action.error];
    case "DELETE_ERROR":
      return []
    default:
      return state;
  }
}

export { errorReducer };