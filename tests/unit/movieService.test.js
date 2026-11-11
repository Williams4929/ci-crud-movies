const service = require('../../src/movieService');

beforeEach(() => service.reset());

describe('movieService (unitarias)', () => {
  test('validate rechaza título vacío', () => {
    expect(service.validate({ title: '' })).toContain('title es obligatorio');
  });

  test('validate rechaza año inválido', () => {
    expect(service.validate({ title: 'X', year: 1500 })).toHaveLength(1);
  });

  test('validate acepta datos correctos', () => {
    expect(service.validate({ title: 'Matrix', year: 1999 })).toEqual([]);
  });

  test('create asigna id incremental y valores por defecto', () => {
    const a = service.create({ title: 'Matrix', year: 1999 });
    const b = service.create({ title: '  Alien  ' });
    expect(a.id).toBe(1);
    expect(b.id).toBe(2);
    expect(b.title).toBe('Alien');
    expect(b.year).toBeNull();
  });

  test('update y remove devuelven null/false si no existe', () => {
    expect(service.update(99, { title: 'X' })).toBeNull();
    expect(service.remove(99)).toBe(false);
  });
});