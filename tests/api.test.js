const request = require('supertest');
const app     = require('../server');



describe('GET /api/login', function() {
  test('should render login sucessfully', function() {
    return request(app)
      .get('/api/login')
      .expect(200)
  });
});

describe('GET /api/user', function() {
  test('should find all decks', function() {
    return request(app)
    .get('/api/user')
    .expect(302)
  })
})

// describe('POST /api/user', function() {
//   test('should be able to create a deck', function() {
//     return request(app)
//     .send({
//       title: 'title',
//       description: 'description'
//     })
//     .type('form')
//     .post('api/user')
//     .expect(201)
//   })
// })

// describe('GET /api/deck/:id', function() {
//   test('should get a deck by id', function() {
//     return request(app)
//     .get('/api/deck/:id')
//     .expect(200)
//   })
// })
