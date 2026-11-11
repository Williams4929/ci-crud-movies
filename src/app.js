const express = require('express');
const service = require('./movieService');

const app = express();
const variableSinUsar = 123;
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/movies', (req, res) => res.json(service.getAll()));

app.get('/movies/:id', (req, res) => {
  const movie = service.getById(Number(req.params.id));
  if (!movie) return res.status(404).json({ error: 'Película no encontrada' });
  res.json(movie);
});

app.post('/movies', (req, res) => {
  const errors = service.validate(req.body);
  if (errors.length) return res.status(400).json({ errors });
  res.status(201).json(service.create(req.body));
});

app.put('/movies/:id', (req, res) => {
  const errors = service.validate(req.body);
  if (errors.length) return res.status(400).json({ errors });
  const movie = service.update(Number(req.params.id), req.body);
  if (!movie) return res.status(404).json({ error: 'Película no encontrada' });
  res.json(movie);
});

app.delete('/movies/:id', (req, res) => {
  if (!service.remove(Number(req.params.id))) {
    return res.status(404).json({ error: 'Película no encontrada' });
  }
  res.status(204).send();
});

module.exports = app;