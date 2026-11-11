const request = require('supertest');
const app = require('../../src/app');
const service = require('../../src/movieService');

beforeEach(() => service.reset());

describe('API /movies (integración)', () => {
  test('GET /health responde ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('POST /movies crea una película', async () => {
    const res = await request(app).post('/movies').send({ title: 'Matrix', year: 1999 });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, title: 'Matrix', year: 1999 });
  });

  test('POST /movies con datos inválidos devuelve 400', async () => {
    const res = await request(app).post('/movies').send({ title: '' });
    expect(res.status).toBe(400);
  });

  test('GET /movies lista y GET /movies/:id obtiene', async () => {
    await request(app).post('/movies').send({ title: 'Alien' });
    const list = await request(app).get('/movies');
    expect(list.body).toHaveLength(1);
    const one = await request(app).get('/movies/1');
    expect(one.body.title).toBe('Alien');
  });

  test('GET /movies/:id inexistente devuelve 404', async () => {
    const res = await request(app).get('/movies/99');
    expect(res.status).toBe(404);
  });

  test('PUT /movies/:id actualiza', async () => {
    await request(app).post('/movies').send({ title: 'Alien' });
    const res = await request(app).put('/movies/1').send({ title: 'Aliens', year: 1986 });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Aliens');
  });

  test('PUT inválido o inexistente devuelve 400/404', async () => {
    expect((await request(app).put('/movies/1').send({})).status).toBe(400);
    expect((await request(app).put('/movies/99').send({ title: 'X' })).status).toBe(404);
  });

  test('DELETE /movies/:id elimina y luego da 404', async () => {
    await request(app).post('/movies').send({ title: 'Alien' });
    expect((await request(app).delete('/movies/1')).status).toBe(204);
    expect((await request(app).delete('/movies/1')).status).toBe(404);
  });
    test('GET /movies?genre= filtra por género', async () => {
    await request(app).post('/movies').send({ title: 'Alien', genre: 'terror' });
    await request(app).post('/movies').send({ title: 'Toy Story', genre: 'animación' });
    const res = await request(app).get('/movies?genre=terror');
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe('Alien');
  });
});