function getFromStorage(key) {
  const token = localStorage.getItem("auth");

  if (!token) {
    return [];
  }

  return JSON.parse(token);
}
getFromStorage();

export function getToken() {
  return getFromStorage("jwt");
}
