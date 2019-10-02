/* eslint-disable new-cap */
const router = require('express').Router();
const Stop = require('../lib/models/stop');

router

  .post('/', (req, res, next) => {
  
    Stop.create(req.body)
      .then(stop => {      
        res.json(stop);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Stop.find()
      .lean()
      .then(stops => res.json(stops))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Stop.findById(req.params.id)
      .lean()
      .then(stops => res.json(stops))
      .catch(next);
  })

  .put('/:id', ({ params, body }, res, next) => {
    Stop.updateById(params.id, body)
      .then(stop => res.json(stop))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Stop.findByIdAndRemove(req.params.id)
      .then(stop => res.json(stop))
      .catch(next);
  });

module.exports = router;