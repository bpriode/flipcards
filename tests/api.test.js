const request = require('supertest');
const app     = require('../server');



describe('GET /api/login', function() {
  test('should retrieve login sucessfully', function() {
    return request(app)
      .get('/api/login')
      .expect(200)
  });
});
