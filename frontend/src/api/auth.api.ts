import api from "../lib/axios";

export interface CustomerRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  cityArea: string;
  password: string;
}

export interface ProfessionalRegistrationData {
  firstName: string;
  lastName: string;
  profession: string;
  email: string;
  contactNumber: string;
  cityArea: string;
  password: string;
  yearOfExperience: number;
  gender: string;
  professionalLicense: string;
}

export interface VendorRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  businessName: string;
  password: string;
  shopAddress: string;
  businessCategory: string;
  tradeLicense: string;
}

export const registerCustomer = async (
  data: CustomerRegistrationData
) => {
  const response = await api.post(
    "/register/customer",
    data
  );

  return response.data;
};

export const registerProfessional = async (
  data: ProfessionalRegistrationData
) => {
  const response = await api.post(
    "/register/professional",
    data
  );

  return response.data;
};

export const registerVendor = async (
  data: VendorRegistrationData
) => {
  const response = await api.post(
    "/register/vendor",
    data
  );

  return response.data;
};