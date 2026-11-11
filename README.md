# ci-crud-movies

![CI](https://github.com/Williams4929/ci-crud-movies/actions/workflows/ci.yml/badge.svg)

API REST CRUD de películas desarrollada con Node.js y Express, con integración continua mediante GitHub Actions (lint, pruebas unitarias, pruebas de integración y cobertura).

## Requisitos

- Node.js 20 o superior

## Uso

```bash
npm install
npm start              # http://localhost:3000
npm run lint
npm test
npm run test:coverage
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Estado del servicio |
| GET | `/movies` | Lista películas (`?genre=` para filtrar) |
| GET | `/movies/:id` | Obtiene una película |
| POST | `/movies` | Crea una película |
| PUT | `/movies/:id` | Actualiza una película |
| DELETE | `/movies/:id` | Elimina una película |

## Entrega

- 📄 [Informe del laboratorio 5.1](INFORME.md)
