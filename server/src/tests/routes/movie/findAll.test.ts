import request from 'supertest';
import app from '../../../app';

const MOVIE_TITLE = 'southpaw';

it('should return movie list', async () => {
  await request(app)
    .get(`/movies/search-by-title?t=${MOVIE_TITLE}`)
    .expect(200);

  const movies = await request(app)
    .get('/movies')
    .expect(200);

  expect(movies.body).not.toEqual([]);
});
