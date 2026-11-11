let movies = [];
let nextId = 1;

function validate(data) {
  const errors = [];
  if (!data || typeof data.title !== 'string' || data.title.trim() === '') {
    errors.push('title es obligatorio');
  }
  if (data && data.year !== undefined && (!Number.isInteger(data.year) || data.year < 1888)) {
    errors.push('year debe ser un entero >= 1888');
  }
  return errors;
}

function getAll() {
  return movies;
}

function getById(id) {
  return movies.find((m) => m.id === id) || null;
}

function create(data) {
  const movie = {
    id: nextId++,
    title: data.title.trim(),
    year: data.year ?? null,
    genre: data.genre ?? null,
  };
  movies.push(movie);
  return movie;
}

function update(id, data) {
  const movie = getById(id);
  if (!movie) return null;
  movie.title = data.title.trim();
  movie.year = data.year ?? null;
  movie.genre = data.genre ?? null;
  return movie;
}

function remove(id) {
  const index = movies.findIndex((m) => m.id === id);
  if (index === -1) return false;
  movies.splice(index, 1);
  return true;
}

function reset() {
  movies = [];
  nextId = 1;
}

module.exports = { validate, getAll, getById, create, update, remove, reset };