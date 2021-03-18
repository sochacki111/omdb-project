import request from 'supertest';
import app from '../../../app';

const MOVIE_TITLE = 'southpaw';

it('should create new comment', async () => {
  const movie = await request(app)
    .get(`/movies/search-by-title?t=${MOVIE_TITLE}`)
    .expect(200);

  const comment = await request(app)
    .post(`/movies/${movie.body._id}/comments`)
    .send({ text: 'test comment', ownerName: 'john doe' })
    .expect(201);

  expect(comment.body).not.toEqual({});
});
