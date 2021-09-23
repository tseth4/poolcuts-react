import request from "../../request";
import { User } from "../../types/Auth";
import { FBUser, FBUserAuthResponse } from "../../types/FBUser";
import { SelectedIds } from "../../types/SelectedIds";
import { NewCut } from "../../types/Cut";

export const getAllOpenCutsService = () => {
  return request({
    url: "/cuts/open",
    method: "GET",
  });
};

export const getAllCuts = () => {
  return request({
    url: "/cuts",
    method: "GET",
  });
};

export const getOpenBarberCuts = (barber: User) => {
  return request({
    url: `/cuts/barber/${barber.id}`,
    method: "GET",
  });
};

export const deleteCutsByIdsArr = (data: SelectedIds) => {
  return request({
    url: '/cuts/delete',
    method: "DELETE",
    data,
  });
};

export const getOpenFacebookBarberCuts = (barber: FBUserAuthResponse) => {
  return request({
    url: `/cuts/facebook/barber/${barber.id}`,
    method: "GET",
  });
};

export const newCutService = (data: NewCut, user: User) => {
  return request({
    url: `/barber/${user.id}/cut/new`,
    method: "POST",
    data,
  });
};

export const updateCutService = (
  data: NewCut,
  user: FBUserAuthResponse | User
) => {
  let url: string = "";
  if (typeof user === "object" && hasOwnProperty(user, "jwt")) {
    url = `/barber/${user.id}/cut/update`;
  } else if (typeof user === "object" && hasOwnProperty(user, "accessToken")) {
    url = `/barber/facebook/${user.id}/cut/update`;
  }
  return request({
    url: url,
    method: "PUT",
    data,
  });
};

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}
