const request = require('../request');
const db = require('../db');

describe('stops api', () => {
  beforeEach(() => {
    return db.dropCollection('stops');
  });

  const data = {
    location: {
      latitude: 37,
      longitude: 127
    },
    weather: {
      any: 'object'
    },
    attendance: 137
  };

  function postStop(stop) {
    return request
      .post('/api/stops')
      .send(stop)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a stop', () => {
    return postStop(data)
      .then(stop => {
        expect(stop).toEqual({
          _id: expect.any(String),
          __v: 0,
          location: {
            latitude: 37,
            longitude: 127
          },
          weather: {
            any: 'object'
          },
          attendance: 137
        });
      });
  });

  it('gets stop by id', () => {
    return postStop(data).then(stop => {
      console.log(stop);

      return request.get(`/api/stops/${stop._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(stop);
        });
    });
  });
});