const mongoose = require('mongoose');

const villagesSchema = new mongoose.Schema(
  {
    village_name: {
      type: String,
      required: true,
    },
    village_code: {
      type: String,
      required: true,
      unique: true,
    },
    cell_code: {
      type: String,
    },
    cell_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cells',
    },
    status: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: {} }
);

const Villages = mongoose.model(`Villages`, villagesSchema);
module.exports = Villages;
