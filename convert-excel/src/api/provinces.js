const express = require('express');
const Provinces = require('../models/provinces');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, fullname, code } = req.body;

    const elementExist = await Provinces.findOne({
      province_code: code,
    }).exec();

    if (!elementExist) {
      const province = Provinces({
        province_name: name,
        full_name: fullname,
        province_code: code,
      });

      await province.save();

      res.json({
        message: 'Success',
        data: { province },
      });
    } else {
      res.status(400).json({
        message: 'Failed',
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const provinces = await Provinces.find().exec();
    res.json({
      message: 'Success',
      data: provinces,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
