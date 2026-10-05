import { z } from "zod";

const baseRegistrationSchema = {
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address"),

  contactNumber: z
    .string()
    .trim()
    .min(7, "Please provide a valid contact number"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters"),

  cityArea: z
    .string()
    .trim()
    .min(2, "City/area is required"),
};

export const customerRegistrationSchema = z.object({
  ...baseRegistrationSchema,
});

export const professionalRegistrationSchema = z.object({
  ...baseRegistrationSchema,

  profession: z
    .string()
    .trim()
    .min(2, "Profession is required"),

  yearOfExperience: z
    .coerce
    .number()
    .int("Years of experience must be a whole number")
    .min(0, "Experience cannot be negative"),

  gender: z
    .string()
    .trim()
    .min(1, "Gender is required"),

  professionalLicense: z
    .string()
    .trim()
    .min(1, "Professional license is required"),
});

export const vendorRegistrationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address"),

  contactNumber: z
    .string()
    .trim()
    .min(7, "Please provide a valid contact number"),

  businessName: z
    .string()
    .trim()
    .min(2, "Business/shop name is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters"),

  shopAddress: z
    .string()
    .trim()
    .min(5, "Shop address is required"),

  businessCategory: z
    .string()
    .trim()
    .min(2, "Business category is required"),

  tradeLicense: z
    .string()
    .trim()
    .min(1, "Trade license is required"),
});