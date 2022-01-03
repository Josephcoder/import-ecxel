const express = require('express');
const xlsx = require('xlsx');
const Districts = require('../models/districts');
const Provinces = require('../models/provinces');

const router = express.Router();

const names = 'List_of_Villages_for_all_technologyupdate.xlsx';

router.post('/', async (req, res) => {
  try {
    const path = `/media/jean/My Document/project/test/import-ecxel/documents/${names}`;
    const workBook = await xlsx.readFile(path, { cellDates: true });
    const workSheetNames = workBook.SheetNames[1];
    const workSheet = workBook.Sheets[workSheetNames];
    const data = xlsx.utils.sheet_to_json(workSheet);

    for (let element of data) {
      const elementExist = await Districts.findOne({
        district_code: element.Id,
      }).exec();

      if (!elementExist) {
        const provinces = await Provinces.findOne({
          province_code: element.Province,
        }).exec();

        const district = await Districts({
          district_name: element.Name,
          district_code: element.Id,
          province_code: element.Province,
          province_id: provinces._id,
        });

        await district.save();
      }
    }

    res.json({
      message: 'Success',
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const districts = await Districts.find().exec();
    res.json({
      message: 'Success',
      data: districts,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
