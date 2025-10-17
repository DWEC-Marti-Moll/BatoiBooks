const URL = "http://localhost:3000/users";

export async function getDBUsers() {
  const response = await fetch(URL);
  if (!response.ok) throw new Error("Users not found");
  return await response.json();
}

export async function getDBUser(userId) {
  const response = await fetch(URL + "/" + userId);
  if (!response.ok) throw new Error("User not found");
  return await response.json();
}

export async function addDBUser(user) {
  const response = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Error al intentar añadir nuevo usuario");
  return await response.json();
}

export async function getDBUserById(userId) {
  const response = await fetch(URL + "/" + userId);
  if (!response.ok) throw new Error("User not found");
  return await response.json();
}

export async function removeDBUser(userId) {
  const response = await fetch(URL + "/" + userId, { method: "DELETE" });
  if (!response.ok) throw new Error("User not found");
}

export async function changeDBUser(user) {
  const response = await fetch(URL + "/" + user.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Error al intentar cambiar usuario");
  return await response.json();
}

export async function changeDBUserPassword(userId, newPasswd) {
  const response = await fetch(URL + "/" + userId, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: newPasswd }),
  });
  return response.json();
}
