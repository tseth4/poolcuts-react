import request from "../request";
import { User } from "../types/User";
import { FBUser, FBUserAuthResponse } from "../types/FBUser";
import { SelectedIds } from "../types/SelectedIds";
import { NewCut } from "../types/Cut";

export const getAllCutsService = (user: any) => {
  let headers: any;
  if (typeof user === "object" && hasOwnProperty(user, "jwt")) {
    headers = {
      Authorization: `Bearer ` + `${user.jwt}`,
      "Content-Type": "application/json",
    };
  } else if (typeof user === "object" && hasOwnProperty(user, "accessToken")) {
    headers = {
      Authorization: `Token ` + `${user.accessToken}`,
      "Content-Type": "application/json",
    };
  }
  return request({
    url: "cuts/open",
    method: "GET",
    headers: headers,
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
    headers: headers,
  });
};

export const deleteCutsByIdsArr = (data: SelectedIds, user: any) => {
  let headers: any;
  if (typeof user === "object" && hasOwnProperty(user, "jwt")) {
    headers = {
      Authorization: `Bearer ` + `${user.jwt}`,
      "Content-Type": "application/json",
    };
  } else if (typeof user === "object" && hasOwnProperty(user, "accessToken")) {
    headers = {
      Authorization: `Token ` + `${user.accessToken}`,
      "Content-Type": "application/json",
    };
  }

  return request({
    url: "/cuts/delete",
    method: "DELETE",
    headers,
    data,
  });
};

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
    headers,
  });
};

export const newCutService = (
  data: NewCut,
  user: FBUserAuthResponse | User
) => {
  let headers: any;
  let url: string = "";
  if (typeof user === "object" && hasOwnProperty(user, "jwt")) {
    headers = {
      Authorization: `Bearer ` + `${user.jwt}`,
      "Content-Type": "application/json",
    };
    url = `/barber/${user.id}/cut/new`;
  } else if (typeof user === "object" && hasOwnProperty(user, "accessToken")) {
    headers = {
      Authorization: `Token ` + `${user.accessToken}`,
      "Content-Type": "application/json",
    };
    url = `/barber/facebook/${user.id}/cut/new`;
  }
  return request({
    url: url,
    method: "POST",
    headers,
    data,
  });
};

export const updateCutService = (
  data: NewCut,
  user: FBUserAuthResponse | User
) => {
  let headers: any;
  let url: string = "";
  if (typeof user === "object" && hasOwnProperty(user, "jwt")) {
    headers = {
      Authorization: `Bearer ` + `${user.jwt}`,
      "Content-Type": "application/json",
    };
    url = `/barber/${user.id}/cut/update`;
  } else if (typeof user === "object" && hasOwnProperty(user, "accessToken")) {
    headers = {
      Authorization: `Token ` + `${user.accessToken}`,
      "Content-Type": "application/json",
    };
    url = `/barber/facebook/${user.id}/cut/update`;
  }
  return request({
    url: url,
    method: "PUT",
    headers,
    data,
  });

};

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}
