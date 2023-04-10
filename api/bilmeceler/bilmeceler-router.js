// değişiklik yapmayın
const router = require('express').Router();
const bilmeceler = require('./bilmeceler-data');
const bilmecelerModel = require('./bilmeceler-model');

router.get('/', async(req, res, next) => {
  try {
    res.status(200).json(await bilmecelerModel.getAll())
  } catch (error) {
    next(error)
  }
})

router.post('/id', async(req, res, next) => {
  try {
    res.status(200).json(await bilmecelerModel.getById(req.body.id))
  } catch (error) {
    next(error)
  }
})

router.post('/', async(req, res, next) => {
  try {
    res.status(201).json(await bilmecelerModel.create(req.body))
  } catch (error) {
    next(error)
  }
})

module.exports = router;
