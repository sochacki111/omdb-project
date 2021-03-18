import request from 'supertest';
import app from '../../../app';

const MOVIE_TITLE = 'southpaw';

it('should find all comments', async () => {
  const movie = await request(app)
    .get(`/movies/search-by-title?t=${MOVIE_TITLE}`)
    .expect(200);

  await request(app)
    .post(`/movies/${movie.body._id}/comments`)
    .send({ text: 'test comment', ownerName: 'john doe' })
    .expect(201);

  const comments = await request(app)
    .get(`/movies/${movie.body._id}/comments`)
    .expect(200);

  expect(comments.body).not.toEqual([]);
});
