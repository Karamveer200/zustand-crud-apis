import * as yup from "yup";

export const addProductFieldOrder = [
  "title",
  "price",
  "description",
  "image",
  "category",
] as const;

export type AddProductFieldName = (typeof addProductFieldOrder)[number];

export const addProductValidationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),

  price: yup
    .string()
    .required("Price is required")
    .matches(/^\d+(\.\d{1,2})?$/, "Enter a valid price (e.g. 12 or 12.99)")
    .test(
      "positive",
      "Price must be greater than 0",
      (v) => v != null && parseFloat(v) > 0,
    ),

  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),

  image: yup
    .string()
    .trim()
    .required("Image URL is required")
    .url("Must be a valid URL"),

  category: yup.string().required("Select a category"),
});

export type AddProductFormValues = yup.InferType<
  typeof addProductValidationSchema
>;
