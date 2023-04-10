// değişiklik yapmayın
const router = require('express').Router();
const bilmeceler = require('./bilmeceler-data');
const bilmecelerModel = require('./bilmeceler-model');

router.get('/', (req, res) => {
  res.status(200).json();
});

router.get('/deneme', async(req, res, next) => {
  try {
    res.status(200).json(await bilmecelerModel.create( {
      "bilmece": "Bir kamyonu kim cift eliyle durdurabilir?"
    }))
  } catch (error) {
    next(error)
  }
})

module.exports = router;
