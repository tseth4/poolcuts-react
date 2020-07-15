import request from "../request";
import { Book } from "../types/Book";
import { User } from "../types/User";
import { FBUser } from "../types/FBUser";
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

function hasOwnProperty<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}