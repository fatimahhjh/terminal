import axios from "axios"
export function getUserInfo() {
  return axios.get("/ecc/test/login")
}