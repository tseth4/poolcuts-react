import request from "../request";
import { Book, NewBooking } from "../types/Book";
import { User } from "../types/Auth";
import { FBUser, FBUserAuthResponse } from "../types/FBUser";
import { SelectedIds } from "../types/SelectedIds";
export const bookApptService = (data: Book) => {};

export const bookAppointmentService = (data: NewBooking, user: User) => {
  let url: any = `/cut/${data.cutId}/user/${user.email}/book/new`
  return request({
    url: url,
    method: "POST",
    data,
  });
};

export const getBarberBookingsService = (barber: User) => {
  return request({
    url: `barber/${barber.id}/books`,
    method: "GET",
  });
};

export const getClientAppointmentsService = (user: User) => {
  return request({
    url: `user/${user.id}/books`,
    method: "GET",
  });
};

export const cancelAppointmentService = (id: number) => {
  return request({
    url: `/book/${id}/delete`,
    method: "DELETE",
  });
};

export const cancelBooksByIdsArr = (data: SelectedIds) => {
  return request({
    url: "/books/delete",
    method: "DELETE",
    data,
  });
};

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}
