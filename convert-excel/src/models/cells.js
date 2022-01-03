const mongoose = require('mongoose');

const cellsSchema = new mongoose.Schema(
  {
    cell_name: {
      type: String,
      required: true,
    },
    cell_code: {
      type: String,
      required: true,
      unique: true,
    },
    sector_code: {
      type: String,
    },
    sector_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sectors',
    },
    status: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: {} }
);

const Cells = mongoose.model(`Cells`, cellsSchema);
module.exports = Cells;
