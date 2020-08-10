import { AppActions } from "../types"
import { IError } from "../types/Error"

export const recieveError = (error: IError): AppActions => {
  console.log(error);
  return {
    type: "SAVE_ERROR",
    error: error
  };
}

export const deleteError = (): AppActions => {
  return{
    type: "DELETE_ERROR",
  }
}