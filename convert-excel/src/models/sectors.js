const mongoose = require('mongoose');

const sectorsSchema = new mongoose.Schema(
  {
    sector_name: {
      type: String,
      required: true,
    },
    sector_code: {
      type: String,
      required: true,
      unique: true,
    },
    district_code: {
      type: String,
    },
    district_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Districts',
    },
    status: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: {} }
);

const Sectors = mongoose.model(`Sectors`, sectorsSchema);
module.exports = Sectors;
