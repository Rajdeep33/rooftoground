import { auth } from "../lib/auth.js";

import CustomerProfile from "../models/CustomerProfile.js";
import ProfessionalProfile from "../models/ProfessionalProfile.js";
import VendorProfile from "../models/VendorProfile.js";

import { USER_TYPES } from "../constants/userTypes.js";

export const registerUser = async ({
  type,
  firstName,
  lastName,
  email,
  password,
  profileData,
}) => {
  const name = `${firstName} ${lastName}`;

  const result = await auth.api.signUpEmail({
    returnHeaders: true,

    body: {
      name,
      email,
      password,

      // This comes from the backend,
      // NOT from the frontend.
      userType: type,
    },
  });

  const user = result.response?.user ?? result.user;

  if (!user) {
    throw new Error("User registration failed");
  }

  let profile;

  try {
    switch (type) {
      case USER_TYPES.CUSTOMER:
        profile = await CustomerProfile.create({
          userId: user.id,
          firstName,
          lastName,
          ...profileData,
        });
        break;

      case USER_TYPES.PROFESSIONAL:
        profile = await ProfessionalProfile.create({
          userId: user.id,
          firstName,
          lastName,
          ...profileData,
        });
        break;

      case USER_TYPES.VENDOR:
        profile = await VendorProfile.create({
          userId: user.id,
          firstName,
          lastName,
          ...profileData,
        });
        break;

      default:
        throw new Error("Invalid user type");
    }
  } catch (error) {
    console.error(
      "Profile creation failed after auth user creation:",
      error
    );

    throw new Error(
      "Account was created but profile creation failed. Please contact support."
    );
  }

  return {
    user,
    profile,
    headers: result.headers,
  };
};