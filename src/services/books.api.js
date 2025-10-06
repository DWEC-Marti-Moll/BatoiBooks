const URL = 'http://localhost:3000/books';

getDBBooks = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}
