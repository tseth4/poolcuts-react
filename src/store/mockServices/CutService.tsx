import { User } from "../types/Auth";
import { Cut, NewCut, UpdateCut } from "../types/Cut";
import { FBUserAuthResponse } from "../types/FBUser";
import { SelectedIds } from "../types/SelectedIds";

export const getAllOpenCutsService = () => {
  const bookJSON = localStorage.getItem("books");
  const cutJSON = localStorage.getItem("cuts");

  let allBooks = bookJSON ? JSON.parse(bookJSON) : [];
  let allCuts = cutJSON ? JSON.parse(cutJSON) : [];
  let openCuts: Cut[] = [];
  let bookedCutsMap: any = {};
  for (const book of allBooks) {
    bookedCutsMap[book.cut.cutId] = 1;
  }

  for (const cut of allCuts) {
    if (!bookedCutsMap[cut.cutId]) {
      openCuts.push(cut);
    }
  }

  return new Promise<Cut[]>((resolve, reject) => {
    resolve(openCuts);
  });
  // return openCuts;
};

export const getOpenBarberCuts = (barber: User) => {
  const bookJSON = localStorage.getItem("books");
  const cutJSON = localStorage.getItem("cuts");

  let allBooks = bookJSON ? JSON.parse(bookJSON) : [];
  let allCuts: Cut[] = cutJSON ? JSON.parse(cutJSON) : [];

  let openBarberCuts: Cut[] = [];

  let bookedCutsMap: any = {};
  for (const book of allBooks) {
    bookedCutsMap[book.cut.cutId] = 1;
  }

  for (const cut of allCuts) {
    if (cut.cutId && cut.barberId) {
      if (!bookedCutsMap[cut.cutId]) {
        if (cut.barberId.id === barber.id) {
          openBarberCuts.push(cut);
        }
      }
    }
  }

  return new Promise<Cut[]>((resolve, reject) => {
    resolve(openBarberCuts);
  });
};

export const deleteCutsByIdsArr = (data: SelectedIds) => {
  const cutJSON = localStorage.getItem("cuts");
  let allCuts = cutJSON ? JSON.parse(cutJSON) : [];
  let returnCuts: Cut[] = [];
  return new Promise<Cut[]>((resolve, reject) => {
    for (const c of allCuts) {
      if (!data.ids.includes(c.cutId)) {
        returnCuts.push(c);
      }
    }
    localStorage.setItem("cuts", JSON.stringify(returnCuts));
    resolve(returnCuts);
  });
};

export const newCutService = (data: NewCut, user: User) => {
  const cutJSON = localStorage.getItem("cuts");
  let allCuts: Cut[] = cutJSON ? JSON.parse(cutJSON) : [];

  let newCut: Cut = {
    cutId: Math.floor(Math.random() * 100),
    barberId: user,
    appointmentDate: data.appointmentDate,
    location: data.location,
  };
  allCuts.push(newCut);
  localStorage.setItem("cuts", JSON.stringify(allCuts));

  return new Promise<Cut[]>((resolve, reject) => {
    resolve(allCuts);
  });
};

export const updateCutService = (
  data: UpdateCut,
  user: FBUserAuthResponse | User
) => {
  const cutJSON = localStorage.getItem("cuts");
  let allCuts = cutJSON ? JSON.parse(cutJSON) : [];

  for (const c of allCuts) {
    if (c.cutId === data.cutId) {
      c.appointmentDate = data.appointmentDate;
      c.location = data.location;
    }
  }
  localStorage.setItem("cuts", JSON.stringify(allCuts));
  return new Promise<Cut[]>((resolve, reject) => {
    resolve(allCuts);
  });
};

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}
