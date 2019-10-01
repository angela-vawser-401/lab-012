const request = require('../request');
const db = require('../db');

describe('tours api', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });

  const data = {
    title: 'Ssing Ssing Tour',
    activities: ['Live Concert', 'Concessions', 'VIP Lounge'],
    launchDate: new Date(),
    stops: []
  };

  function postTour(tour) {
    return request
      .post('/api/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a tour', () => {
    return postTour(data)
      .then(tour => {
        expect(tour).toEqual({
          _id: expect.any(String),
          __v: 0,
          title: 'Ssing Ssing Tour',
          activities: ['Live Concert', 'Concessions', 'VIP Lounge'],
          launchDate: expect.any(String),
          stops: []
        });
      });
  });

  it('gets tour by id', () => {
    return postTour(data).then(tour => {
      console.log(tour);

      return request.get(`/api/tours/${tour._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(tour);
        });
    });
  });
});