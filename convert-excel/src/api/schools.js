const express = require('express');
const xlsx = require('xlsx');
const Schools = require('../models/schools');
const Sectors = require('../models/sectors');
const Districts = require('../models/districts');

const router = express.Router();

const names =
  'SchoolsdataandHTsrequestedorOnlineteachersrecruitmentPortal.xlsx';

router.post('/', async (req, res) => {
  try {
    const path = `/media/jean/My Document/project/test/import-ecxel/documents/${names}`;
    const workBook = await xlsx.readFile(path, { cellDates: true });
    const workSheetNames = workBook.SheetNames[0];
    const workSheet = workBook.Sheets[workSheetNames];
    const data = xlsx.utils.sheet_to_json(workSheet);

    for (let element of data) {
      const schoolCodeExist = await Schools.findOne({
        school_code: element['school code'],
      }).exec();

      if (!schoolCodeExist) {
        const sector = await Sectors.findOne({
          sector_code: element['sector_code'],
        }).exec();

        const school = await Schools({
          school_name: element['school name'],
          school_code: element['school code'],
          sector_code: element['sector_code'],
          sector_id: sector._id,
          school_status: element['school status'],
          teachers_number: {
            male: element['Male teachers'] ? element['Male teachers'] : 0,
            female: element['Female teachers'] ? element['Female teachers'] : 0,
          },
          head_teachers: {
            names: element['HT Names'] ? element['HT Names'] : null,
            email: element['email'] ? element['email'] : null,
            phone_number: element['phone'] ? element['phone'] : null,
          },
        });

        await school.save();
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
    const results = await Schools.find().exec();
    res.json({
      count: results.length,
      message: 'Success',
      data: results,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
