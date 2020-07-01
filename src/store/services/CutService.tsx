import request from "../request";

export const getAllCutsService = () => {
  return request({
    url: "cuts",
    method: "GET"
  })
}

