


const request = require('supertest');
const app = require('./app');



describe('GET /', () => {
    it('should return the homepage', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual('Welcome to the homepage');
    });
  });
  