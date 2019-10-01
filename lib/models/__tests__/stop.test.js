const Stop = require('../stop');

describe('stop model', () => {

  it('validates all stop properties', () => {
    const data = {
      location: {
        latitude: 37,
        longitude: 127
      },
      weather: { 
        any: 'object' // will get from weather API
      },
      attendance: 137
    };

    const stop = new Stop(data);
    const errors = stop.validateSync();
    expect(errors).toBeUndefined();

    const json = stop.toJSON();

    expect(json).toEqual({
      _id: expect.any(Object),
      ...data,
      weather: expect.any(Object)
    });
  });
});