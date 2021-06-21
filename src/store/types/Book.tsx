import { Cut } from './Cut';
import { User, fbClient, Client } from './Auth';
import { FBUserAuthResponse } from './FBUser';
import { IError } from './Error';

export interface BookState {
  books: Book[]
  appointments: Book[];
  error: IError;
  loading: boolean;
}

export interface Book {
  bookId?: number;
  category?: string;
  cut?: Cut;
  client?: Client;
  fbClient?: fbClient
}

export interface NewBooking {
  category?: string;
  cutId?: number;
  clientId?: number;
  fbClientId?: number;
}

