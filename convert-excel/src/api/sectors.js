const express = require('express');
const xlsx = require('xlsx');
const Districts = require('../models/districts');
const Sectors = require('../models/sectors');

const router = express.Router();

const names = 'List_of_Villages_for_all_technologyupdate.xlsx';

router.post('/', async (req, res) => {
  try {
    const path = `/media/jean/My Document/project/test/import-ecxel/documents/${names}`;
    const workBook = await xlsx.readFile(path, { cellDates: true });
    const workSheetNames = workBook.SheetNames[2];
    const workSheet = workBook.Sheets[workSheetNames];
    const data = xlsx.utils.sheet_to_json(workSheet);

    for (let element of data) {
      const elementExist = await Sectors.findOne({
        sector_code: element.Id,
      }).exec();

      if (!elementExist) {
        const district = await Districts.findOne({
          district_code: element['Disrict '],
        }).exec();

        const sector = await Sectors({
          sector_name: element.Sector,
          sector_code: element.Id,
          district_code: element['Disrict '],
          district_id: district._id,
        });

        await sector.save();
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
    const results = await Sectors.find().exec();
    res.json({
      message: 'Success',
      data: results,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
