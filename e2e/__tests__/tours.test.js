jest.mock('../../lib/services/maps-api');
jest.mock('../../lib/services/weather-api');
const request = require('../request');
const db = require('../db');
// const { matchMongoId } = require('../match-helpers');
const getTour = require('../../lib/services/maps-api');
const getWeather = require('../../lib/services/weather-api');

getTour.mockResolvedValue({
  latitude: 41,
  longitude: 74
});

getWeather.mockResolvedValue({
  time: new Date(),
  summary: 'Cloudy with a chance of rain'
});

describe('tours api', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });

  const location1 = {
    name: 'Brooklyn Bowl',
    address: '61 Wythe Avenue, New York, NY'
  };

  const attend1 = {
    attendance: 200
  };

  const data = {
    title: 'Ssing Ssing Tour',
    activities: ['Live Concert', 'Concessions', 'VIP Lounge'],
    launchDate: new Date(),
    stops: [{}]
  };

  function postTour(data) {
    return request
      .post('/api/tours')
      .send(data)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a tour', () => {
    return postTour(data).then(tour => {
      expect(tour).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          launchDate: expect.any(String),
          stops: [{ _id: expect.any(String) }]
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "activities": Array [
            "Live Concert",
            "Concessions",
            "VIP Lounge",
          ],
          "launchDate": Any<String>,
          "stops": Array [
            Object {
              "_id": Any<String>,
            },
          ],
          "title": "Ssing Ssing Tour",
        }
      `
      );
    });
  });

  it('gets tours', () => {
    return postTour(data).then(() => {
      return request.get('/api/tours').then(({ body }) => {
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            launchDate: expect.any(String),
            stops: [{ _id: expect.any(String) }]
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "activities": Array [
              "Live Concert",
              "Concessions",
              "VIP Lounge",
            ],
            "launchDate": Any<String>,
            "stops": Array [
              Object {
                "_id": Any<String>,
              },
            ],
            "title": "Ssing Ssing Tour",
          }
        `
        );
      });
    });
  });

  it('adds a stop', () => {
    return postTour(data)
      .then(tour => {
        return request
          .post(`/api/tours/${tour._id}/stops`)
          .send(location1)
          .expect(200)
          .then(body => {
            return [body, location1, location1];
          });
      })

      .then(out => {
        const stops = out[0].body[1];
        expect(stops).toMatchInlineSnapshot(
          {
            _id: expect.any(String)
          },
          `
          Object {
            "_id": Any<String>,
          }
        `
        );
      });
  });

  it('deletes a stop', () => {
    return postTour(data).then(tour => {
      return request
        .post(`/api/tours/${tour._id}/stops`)
        .send(location1)
        .expect(200)
        .then(out => {
          const stops = out.body[1];
          return request
            .delete(`/api/tours/${tour._id}/stops/${stops._id}`)
            .send(tour._id, stops._id)
            .expect(200);
        });
    });
  });

  it('updates attend', () => {
    return postTour(data).then(tour => {
      return request
        .post(`/api/tours/${tour._id}/stops`)
        .send(location1)
        .expect(200)
        .then(out => {
          const stops = out.body[0];
          return request
            .put(`/api/tours/${tour._id}/stops/${stops._id}/attendance`)
            .send(attend1)
            .expect(200)
            .then(({ body }) => {
              expect(body[0].attendance).toBe(200);
            });
        });
    });
  });
});
