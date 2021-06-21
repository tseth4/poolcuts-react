import { AuthState } from "./Auth";
import { BookState } from "./Book";
import { CutState } from "./Cut";

export interface RootState {
  bookState: BookState;
  cutState: CutState;
  authState: AuthState
}
