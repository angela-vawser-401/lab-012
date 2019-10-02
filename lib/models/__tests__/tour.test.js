const Tour = require('../tour');

describe('tour model', () => {

  it('validates all tour properties', () => {
    const data = {
      title: 'Ssing Ssing Tour',
      activities: ['Live Concert', 'Concessions', 'VIP Lounge'],
      launchDate: new Date(),
      stops: [{
        location: {
          latitude: 41,
          longitude: 74
        },
        weather: {
          time: new Date(),
          forecast: 'Cloudy with a chance of rain'
        },
        attendance: 200
      }]
    };

    const tour = new Tour(data);
    const errors = tour.validateSync();
    expect(errors).toBeUndefined();

    const json = tour.toJSON();

    expect(json).toEqual({
      _id: expect.any(Object),
      ...data,
      stops: [{
        _id: expect.any(Object),
        ...data.stops[0]
      }]
    });
  });
});