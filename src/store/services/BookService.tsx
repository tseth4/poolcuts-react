import request from "../request";
import { Book } from "../types/Book";
import { User } from "../types/User";
import { FBUser, FBUserAuthResponse } from "../types/FBUser";
// export const bookApptService = (data: Book) => {
// }

export const bookAppointmentService = (data: Book, user: any) => {
  let headers: any;
  if (typeof user === 'object' && hasOwnProperty(user, 'jwt')) {
    console.log(user.jwt);
    headers = {
      Authorization: `Bearer ` + `${user.jwt}`,
      "Content-Type": "application/json",
    };
  } else if (typeof user === 'object' && hasOwnProperty(user, 'accessToken')) {
    headers = {
      Authorization: `Token ` + `${user.accessToken}`,
      "Content-Type": "application/json",
    };
  }
  console.log(data);
  return request({
    url: `cut/${data.cutId}/user/${user.email}/book/new`,
    method: "POST",
    headers: headers,
    data
  })
}

export const getBarberBookingsService = (barber: User) => {
  let headers: any;
  headers = {
    Authorization: `Bearer ` + `${barber.jwt}`,
    "Content-Type": "application/json"
  };
  return request({
    url: `barber/${barber.id}/books`,
    method: "GET",
    headers: headers
  })
}

export const getFacebookBarberBookingsService = (barber: FBUserAuthResponse) => {
  let headers: any;
  headers = {
    Authorization: `Token ` + `${barber.accessToken}`,
    "Content-Type": "application/json"
  }
  return request({
    url: `facebook/barber/${barber.id}/books`,
    method: "GET",
    headers: headers
  })
}

export const getFBClientAppointmentsService = (fbUser: FBUserAuthResponse) => {
  let headers: any = {
    Authorization: `Token ` + `${fbUser.accessToken}`,
    "Content-Type": "application/json",
  };
  return request({
    url: `facebook/user/${fbUser.id}/books`,
    method: "GET",
    headers: headers
  })
}

export const getClientAppointmentsService = (user: User) => {
  let headers: any = {
    Authorization: `Bearer ` + `${user.jwt}`,
    "Content-Type": "application/json"
  };
  return request({
    url: `user/${user.id}/books`,
    method: "GET",
    headers: headers
  })
}

function hasOwnProperty<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}