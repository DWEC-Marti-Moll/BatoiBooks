const URL = "http://localhost:3000/modules";

export async function getDBModules() {
  const response = await fetch(URL);
  if (!response.ok) throw new Error("Module not found");
  return await response.json();
}
