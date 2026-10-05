import mongoose from "mongoose";

const professionalProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    profession: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },

    cityArea: {
      type: String,
      required: true,
      trim: true,
    },

    yearOfExperience: {
      type: Number,
      required: true,
      min: 0,
    },

    gender: {
      type: String,
      required: true,
      trim: true,
    },

    professionalLicense: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProfessionalProfile = mongoose.model(
  "ProfessionalProfile",
  professionalProfileSchema
);

export default ProfessionalProfile;