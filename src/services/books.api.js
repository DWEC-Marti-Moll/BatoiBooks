const URL = import.meta.env.VITE_URL_API + "/books";

export async function getDBBooks() {
  const response = await fetch(URL);
  if (!response.ok) throw new Error("Books not founds");
  return await response.json();
}

export async function getDBBook(bookId) {
  const response = await fetch(URL + "/" + bookId);
  if (!response.ok) throw new Error("Book not found");
  return await response.json();
}

export async function addDBBook(book) {
  const response = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error("Error al intentar añadir nuevo libro");
  return await response.json();
}

export async function removeDBBook(bookId) {
  const response = await fetch(URL + "/" + bookId, { method: "DELETE" });
  if (!response.ok) throw new Error("Book not found");
}

export async function changeDBBook(book) {
  const response = await fetch(URL + "/" + book.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error("Error al intentar cambiar libro");
  return await response.json();
}

export async function checkBookExists(userId, moduleCode) {
  const response = await fetch(
    `${URL}?userId=${Number(userId)}&moduleCode=${encodeURIComponent(
      String(moduleCode)
    )}`
  );

  if (!response.ok) {
    throw new Error("Error al comprobar si el libro existe");
  }

  const data = await response.json();

  return data.length > 0;
}
