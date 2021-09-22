import request from "../request";
import { User } from "../types/Auth";
import { FBUser, FBUserAuthResponse } from "../types/FBUser";
import { SelectedIds } from "../types/SelectedIds";
import { NewCut, UpdateCut } from "../types/Cut";

export const getAllOpenCutsService = () => {

  const bookJSON = localStorage.getItem('books')
  const cutJSON = localStorage.getItem("cuts");

  let allBooks = bookJSON ? JSON.parse(bookJSON) : [];
  let allCuts = cutJSON ? JSON.parse(cutJSON) : []
  let openCuts = []
  let bookedCutsMap: any = {}
  for (const book of allBooks){
    bookedCutsMap[book.cut.cutId] = 1
  }

  for (const cut of allCuts){
    if (!bookedCutsMap[cut.cutId]){
      openCuts.push(cut)
    }
  }
  return openCuts;
};

export const getOpenBarberCuts = (barber: User) => {

  const bookJSON = localStorage.getItem('books')
  const cutJSON = localStorage.getItem("cuts");

  let allBooks = bookJSON ? JSON.parse(bookJSON) : [];
  let allCuts = cutJSON ? JSON.parse(cutJSON) : []
  let openBarberCuts = [];
  let bookedCutsMap: any = {}
  for (const book of allBooks){
    bookedCutsMap[book.cut.cutId] = 1
  }

  for (const cut of allCuts){
    if (!bookedCutsMap[cut.cutId]){
      openBarberCuts.push(cut)
      if (cut.barberId.id === barber.id) {
        openBarberCuts.push(cut);
      }
    }
  }
  return openBarberCuts;
};

export const deleteCutsByIdsArr = (data: SelectedIds) => {
  const cutJSON = localStorage.getItem("cuts");
  let allCuts;
  let returnJSON;
  let returnCuts;
  if (cutJSON) {
    allCuts = JSON.parse(cutJSON);
    for (const c of allCuts) {
      if (data.ids.includes(c.cutId)) {
        allCuts.splice(allCuts.indexOf(c.cutId), 1);
      }
    }
    localStorage.setItem("cuts", JSON.stringify(allCuts));
  }

  returnJSON = localStorage.getItem("cuts");

  if (returnJSON) {
    returnCuts = JSON.parse(returnJSON);
    return returnCuts;
  }

  throw {
    errorCode: 400,
    timestamp: "2021-09-21T23:54:23.825+0000",
    jwtMessage: null,
    message: null,
  };
};

export const newCutService = (data: NewCut, user: User) => {
  const cutJSON = localStorage.getItem("cuts");
  let allCuts;
  if (cutJSON) {
    allCuts = JSON.parse(cutJSON);
    allCuts.push(data);
    localStorage.setItem("cuts", JSON.stringify(allCuts));
    return allCuts;
  }

  throw {
    errorCode: 400,
    timestamp: "2021-09-21T23:55:07.045+0000",
    jwtMessage: null,
    message: null,
  };
};

export const updateCutService = (
  data: UpdateCut,
  user: FBUserAuthResponse | User
) => {
  const cutJSON = localStorage.getItem("cuts");
  let allCuts;
  if (cutJSON) {
    allCuts = JSON.parse(cutJSON);
    for (const c of allCuts) {
      if (c.cutId === data.cutId) {
        c.appointmentDate = data.appointmentDate;
        c.location = data.location;
      }
    }
    localStorage.setItem("cuts", JSON.stringify(allCuts));
    return allCuts;
  }

  throw {
    timestamp: "2021-09-21T23:53:28.017+0000",
    status: 404,
    error: "Not Found",
    message: "No message available",
    path: "/barber/facebook/3799831360043592/cut/update",
  };
};

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}
