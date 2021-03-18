import request from 'supertest';
import app from '../../../app';

const MOVIE_TITLE = 'southpaw';

// TODO Mock request to external system
it('should return movie from omdb', async () =>
  request(app).get(`/movies/search-by-title?t=${MOVIE_TITLE}`).expect(200));
