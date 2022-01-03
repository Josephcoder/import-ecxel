const mongoose = require('mongoose');

const schoolsSchema = new mongoose.Schema(
  {
    school_name: {
      type: String,
      required: true,
    },
    school_code: {
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
    school_status: {
      type: String,
    },
    teachers_number: {
      male: {
        type: Number,
      },
      female: {
        type: Number,
      },
    },
    head_teachers: {
      names: {
        type: String,
      },
      email: {
        type: String,
      },
      phone_number: {
        type: String,
      },
    },
    status: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: {} }
);

const Schools = mongoose.model(`Schools`, schoolsSchema);
module.exports = Schools;
