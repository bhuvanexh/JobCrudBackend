// utils/validationSchema.js
import * as yup from "yup";

// Allow only letters, numbers, commas, dashes, and spaces
const cleanStringRegex = /^[a-zA-Z0-9 ,\-']+$/;

export const jobSchema = yup.object({
    title: yup
        .string()
        .required("Job title is required")
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title can be at most 100 characters")
        .matches(cleanStringRegex, "Title can only contain letters, numbers, commas, dashes, apostrophes, and spaces"),

    company: yup
        .string()
        .required("Company name is required")
        .min(2, "Company name must be at least 2 characters")
        .max(100, "Company name can be at most 100 characters")
        .matches(cleanStringRegex, "Company name can only contain letters, numbers, commas, dashes, apostrophes, and spaces"),

    type: yup
        .string()
        .required("Job type is required")
        .oneOf(["Full-time", "Part-time"], "Type must be Full-time or Part-time"),

    location: yup
        .string()
        .required("Location is required")
        .min(2, "Location must be at least 2 characters")
        .max(100, "Location can be at most 100 characters")
        .matches(cleanStringRegex, "Location can only contain letters, numbers, commas, dashes, apostrophes, and spaces"),

    description: yup
        .string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description can be at most 1000 characters"),
});
