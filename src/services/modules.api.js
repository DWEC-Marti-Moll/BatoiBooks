const URL = import.meta.env.VITE_URL_API + "/modules";

export async function getDBModules() {
  const response = await fetch(URL);
  if (!response.ok) throw new Error("Module not found");
  return await response.json();
}
