import request from "../request";
import { Book, NewBooking } from "../types/Book";
import { User } from "../types/User";
import { FBUser, FBUserAuthResponse } from "../types/FBUser";
import { SelectedIds } from "../types/SelectedIds";
// export const bookApptService = (data: Book) => {
// }

export const bookAppointmentService = (data: NewBooking, user: any) => {
  let headers: any;
  let url: any;
  if (typeof user === 'object' && hasOwnProperty(user, 'jwt')) {
    url = `cut/${data.cutId}/user/${user.email}/book/new`;
    headers = {
      Authorization: `Bearer ` + `${user.jwt}`,
      "Content-Type": "application/json",
    };
  } else if (typeof user === 'object' && hasOwnProperty(user, 'accessToken')) {
    url = `cut/${data.cutId}/facebook/${data.fbClientId}/book/new`
    headers = {
      Authorization: `Token ` + `${user.accessToken}`,
      "Content-Type": "application/json",
    };
  }
  return request({
    url: url,
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

export const cancelAppointmentService = (id: number, user: any) => {
  let headers: any;
  if (typeof user === 'object' && hasOwnProperty(user, 'jwt')) {
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
  return request({
    url: `/book/${id}/delete`,
    method: "DELETE",
    headers: headers
  })
}

export const cancelBooksByIdsArr = (data: SelectedIds, user: any) => {
  let headers: any;
  if (typeof user === 'object' && hasOwnProperty(user, 'jwt')) {
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

  return request({
    url: '/books/delete',
    method: "DELETE",
    headers,
    data
  })
}

function hasOwnProperty<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}