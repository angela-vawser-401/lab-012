const Tour = require('../tour');

describe('tour model', () => {

  it('validates all tour properties', () => {
    const data = {
      title: 'Ssing Ssing Tour',
      activities: ['Live Concert', 'Concessions', 'VIP Lounge'],
      launchDate: new Date(),
      stops: []
    };

    const tour = new Tour(data);
    const errors = tour.validateSync();
    expect(errors).toBeUndefined();

    const json = tour.toJSON();

    expect(json).toEqual({
      _id: expect.any(Object),
      ...data
    });
  });
});