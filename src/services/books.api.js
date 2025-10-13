const URL = "http://localhost:3000/books";

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
