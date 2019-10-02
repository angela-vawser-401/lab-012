const request = require('../request');
const db = require('../db');
const { matchMongoId, matchMongoDate } = require('../match-helpers');

describe('tours api', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });

  const data = {
    title: 'Ssing Ssing Tour',
    activities: ['Live Concert', 'Concessions', 'VIP Lounge']
  };

  // const stopA = {
  //   location: {
  //     latitude: 37,
  //     longitude: 127
  //   },
  //   weather: {
  //     any: 'object'
  //   },
  //   attendance: 137
  // };

  // function postStop(stop) {
  //   return request
  //     .post('/api/stops')
  //     .send(stop)
  //     .expect(200)
  //     .then(({ body }) => body);
  // }

  it('posts a tour', () => {
    return request
      .post('/api/tours')
      .send(data)
      .expect(200)
      .then(({ body }) => body)
      .then(postedTour => {
        expect(postedTour).toMatchInlineSnapshot(
          {
            ...matchMongoDate,
            ...matchMongoId
          },
          `
          Object {
            "__v": 0,
            "_id": StringMatching /\\^\\[a-f\\\\d\\]\\{24\\}\\$/i,
            "activities": Array [
              "Live Concert",
              "Concessions",
              "VIP Lounge",
            ],
            "launchDate": StringMatching /\\^\\(-\\?\\(\\?:\\[1-9\\]\\[0-9\\]\\*\\)\\?\\[0-9\\]\\{4\\}\\)-\\(1\\[0-2\\]\\|0\\[1-9\\]\\)-\\(3\\[01\\]\\|0\\[1-9\\]\\|\\[12\\]\\[0-9\\]\\)T\\(2\\[0-3\\]\\|\\[01\\]\\[0-9\\]\\):\\(\\[0-5\\]\\[0-9\\]\\):\\(\\[0-5\\]\\[0-9\\]\\)\\(\\\\\\\\\\.\\[0-9\\]\\+\\)\\?\\(Z\\)\\?/i,
            "stops": Array [],
            "title": "Ssing Ssing Tour",
          }
        `
        );
      });
  });
});

//   it('gets tour by id', () => {
//     return postStop(stopA).then(postedStop => {
//       data.stop = postedStop._id;
//       return postTour(data).then(tour => {
//         console.log(tour);

//         expect(body).toMatchInlineSnapshot(
//           {
//             _id: expect.any(String),
//             studio: {
//               _id: expect.any(String)
//             },
//             __v: 0,
//             location: {
//             latitude: 37,
//             longitude: 127
//             },
//             weather: {
//             any: 'object'
//             },
//             attendance: 137
//         },

//       return request.get(`/api/tours/${tour._id}`)
//         .expect(200)
//         .then(({ body }) => {
//           expect(body).toEqual(tour);
//         });
//     });
//   });
// });
