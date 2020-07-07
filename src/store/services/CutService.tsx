import request from "../request";
import { User } from "../types/User";

export const getAllCutsService = (user: User) => {
  console.log(user);
  return request({
    url: "cuts",
    method: "GET",
    headers: {
      'Authorization': `Bearer ` +  `${user.jwt}`,
      'Content-Type': 'application/json'
    }
  })
}

