/* eslint-disable new-cap */
const router = require('express').Router();
const Tour = require('../lib/models/tour');
const addGeo = require('../lib/middleware/add-geolocation');
const addWeather = require('../lib/middleware/add-weather');

router

  .get('/', (req, res, next) => {
    Tour.find()
      .lean()
      .then(tours => res.json(tours))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Tour.findById(req.params.id)
      .lean()
      .then(tours => res.json(tours))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    Tour.create(req.body)
      .then(tour => res.json(tour))
      .catch(next);
  })

  .put('/:id', ({ params, body }, res, next) => {
    Tour.updateById(params.id, body)
      .then(tour => res.json(tour))
      .catch(next);
  })

  .post('/:id/stops', addGeo(), addWeather(), (req, res, next) => {
    Tour.addStop(req.params.id, req.body.location, req.body.weather)
      .then(stops => res.json(stops))
      .catch(next);
  })

  .delete('/:id/stops/:stopId', ({ params }, res, next) => {
    Tour.removeStop(params.id, params.stopId)
      .then(stops => res.json(stops))
      .catch(next);
  })

  .put('/:id/stops/:stopId/attendance', ({ params, body }, res, next) => {
    Tour.updateAttendance(params.id, params.stopId, body.attendance)
      .then(stops => res.json(stops))
      .catch(next);
  });

module.exports = router;