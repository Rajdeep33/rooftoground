import express from "express";
import { isAPIError } from "better-auth/api";

import {
  customerRegistrationSchema,
  professionalRegistrationSchema,
  vendorRegistrationSchema,
} from "../validators/auth.validator.js";

import { registerUser } from "../services/auth.service.js";

import { USER_TYPES } from "../constants/userTypes.js";

const router = express.Router();

router.post("/register/customer", async (req, res) => {
  try {
    const validatedData = customerRegistrationSchema.parse(req.body);

    const {
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      cityArea,
    } = validatedData;

    const result = await registerUser({
      type: USER_TYPES.CUSTOMER,

      firstName,
      lastName,
      email,
      password,

      profileData: {
        contactNumber,
        cityArea,
      },
    });

    if (result.headers?.getSetCookie) {
      res.setHeader(
        "Set-Cookie",
        result.headers.getSetCookie()
      );
    }

    return res.status(201).json({
      message: "Customer account created successfully",
      user: result.user,
      profile: result.profile,
    });
  } catch (error) {
  console.error(error);

  if (isAPIError(error)) {
    return res.status(error.statusCode || 400).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: "Something went wrong during registration",
  });
}});

router.post("/register/professional", async (req, res) => {
  try {
    const validatedData =
      professionalRegistrationSchema.parse(req.body);

    const {
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      cityArea,
      profession,
      yearOfExperience,
      gender,
      professionalLicense,
    } = validatedData;

    const result = await registerUser({
      type: USER_TYPES.PROFESSIONAL,

      firstName,
      lastName,
      email,
      password,

      profileData: {
        contactNumber,
        cityArea,
        profession,
        yearOfExperience,
        gender,
        professionalLicense,
      },
    });

    if (result.headers?.getSetCookie) {
      res.setHeader(
        "Set-Cookie",
        result.headers.getSetCookie()
      );
    }

    return res.status(201).json({
      message: "Professional account created successfully",
      user: result.user,
      profile: result.profile,
    });
  } catch (error) {
  console.error(error);

  if (isAPIError(error)) {
    return res.status(error.statusCode || 400).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: "Something went wrong during registration",
  });
}
});

router.post("/register/vendor", async (req, res) => {
  try {
    const validatedData =
      vendorRegistrationSchema.parse(req.body);

    const {
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      businessName,
      shopAddress,
      businessCategory,
      tradeLicense,
    } = validatedData;

    const result = await registerUser({
      type: USER_TYPES.VENDOR,

      firstName,
      lastName,
      email,
      password,

      profileData: {
        contactNumber,
        businessName,
        shopAddress,
        businessCategory,
        tradeLicense,
      },
    });

    if (result.headers?.getSetCookie) {
      res.setHeader(
        "Set-Cookie",
        result.headers.getSetCookie()
      );
    }

    return res.status(201).json({
      message: "Vendor account created successfully",
      user: result.user,
      profile: result.profile,
    });
  } catch (error) {
  console.error(error);

  if (isAPIError(error)) {
    return res.status(error.statusCode || 400).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: "Something went wrong during registration",
  });
}   
});

export default router;