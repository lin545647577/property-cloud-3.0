import Cookies from "js-cookie";

const AuthTokenKey = "TankLightToken";

export function setAuthToken(token) {
  return Cookies.set(AuthTokenKey, token);
}

export function getAuthToken() {
  return Cookies.get(AuthTokenKey);
}

export function removeAuthToken() {
  return Cookies.remove(AuthTokenKey);
}
