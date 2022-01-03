const mongoose = require('mongoose');

const districtsSchema = new mongoose.Schema(
  {
    district_name: {
      type: String,
      required: true,
    },
    district_code: {
      type: String,
      required: true,
      unique: true,
    },
    province_code: {
      type: String,
    },
    province_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provinces',
    },
    status: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: {} }
);

const Districts = mongoose.model(`Districts`, districtsSchema);
module.exports = Districts;
