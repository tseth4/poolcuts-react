import request from "../request";
import { User } from "../types/User";
import { FBUser, FBUserAuthResponse } from "../types/FBUser";

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

export const getOpenBarberCuts = (barber: User) => {
  let headers: any;
  headers = {
    Authorization: `Bearer ` + `${barber.jwt}`,
    "Content-Type": "application/json",
  };
  
  return request({
    url: `/cuts/barber/${barber.id}`,
    method: "GET",
    headers: headers
  })
}

export const getOpenFacebookBarberCuts = (barber: FBUserAuthResponse) => {
  // http://localhost:8080/cuts/facebook/barber/3799831360043592
  let headers: any;
  headers = {
    Authorization: `Token ` + `${barber.accessToken}`,
    "Content-Type": "application/json",
  };
  return request({
    url: `/cuts/facebook/barber/${barber.id}`,
    method: "GET",
    headers
  })
}




// your open cuts BY BARBER ID "/cuts/barber/{barberId}"

// OPEN CUTS BY FB BARBER ID "/cuts/facebook/barber/{barberId}"



function hasOwnProperty<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}

