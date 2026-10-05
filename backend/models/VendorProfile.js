import mongoose from "mongoose";

const vendorProfileSchema = new mongoose.Schema(
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

    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    shopAddress: {
      type: String,
      required: true,
      trim: true,
    },

    businessCategory: {
      type: String,
      required: true,
      trim: true,
    },

    tradeLicense: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const VendorProfile = mongoose.model(
  "VendorProfile",
  vendorProfileSchema
);

export default VendorProfile;