const express = require('express');
const xlsx = require('xlsx');
const Villages = require('../models/villages');
const Cells = require('../models/cells');

const router = express.Router();

const names = 'List_of_Villages_for_all_technologyupdate.xlsx';

router.post('/', async (req, res) => {
  try {
    const path = `/media/jean/My Document/project/test/import-ecxel/documents/${names}`;
    const workBook = await xlsx.readFile(path, { cellDates: true });
    const workSheetNames = workBook.SheetNames[4];
    const workSheet = workBook.Sheets[workSheetNames];
    const data = xlsx.utils.sheet_to_json(workSheet);

    for (let element of data) {
      const elementExist = await Villages.findOne({
        village_code: element.Id,
      }).exec();

      if (!elementExist) {
        const cell = await Cells.findOne({
          cell_code: element.cells,
        }).exec();

        const village = await Villages({
          village_name: element.Name,
          village_code: element.Id,
          cell_code: element.cells,
          cell_id: cell._id,
        });

        await village.save();
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
    const results = await Villages.find().exec();
    res.json({
      message: 'Success',
      data: results,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
