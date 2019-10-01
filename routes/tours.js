/* eslint-disable new-cap */
const router = require('express').Router();
const Tour = require('../lib/models/tour');

router

  .post('/', (req, res, next) => {
  
    Tour.create(req.body)
      .then(story => {      
        res.json(story);
      })
      .catch(next);
  })

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
  });

module.exports = router;