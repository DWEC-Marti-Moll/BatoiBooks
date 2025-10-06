const URL = "http://localhost:3000/users";

export async function getDBUsers(){
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};
