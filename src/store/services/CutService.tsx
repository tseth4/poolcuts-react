import request from "../request";
import { User } from "../types/User";
import { FBUser } from "../types/FBUser";

export const getAllCutsService = (user: any) => {
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
    url: "cuts/open",
    method: "GET",
    headers: headers
  });
};

function hasOwnProperty<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}