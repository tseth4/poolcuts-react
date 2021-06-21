import { User, Barber, fbBarber } from "./Auth";
import { FBUserAuthResponse } from "./FBUser";
import { IError } from "./Error";

export interface CutState {
  cuts: Cut[];
  error: IError;
  loading: boolean;
  
}

export interface Cut {
  cutId?: number;
  barberId?: Barber ;
  appointmentDate?: string;
  location?: string;
}

export interface NewCut {
  barberId?: number;
  appointmentDate?: string;
  location?: string;
}

export interface UpdateCut {
  cutId?: number;
  appointmentDate?: string;
  location?: string;
}
