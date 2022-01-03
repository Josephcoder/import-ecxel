const mongoose = require('mongoose');

const provincesChema = new mongoose.Schema(
  {
    province_name: {
      type: String,
      required: true,
      unique: true,
    },
    full_name: {
      type: String,
    },
    province_code: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: {} }
);

const Provinces = mongoose.model(`Provinces`, provincesChema);
module.exports = Provinces;
