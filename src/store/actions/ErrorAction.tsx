import { AppActions } from "../types"
import { Error } from "../types/Error"

export const recieveError = (error: Error): AppActions => {
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