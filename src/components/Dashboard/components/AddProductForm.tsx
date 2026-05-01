import { useMemo } from "react";
import { useFormik } from "formik";

import { CustomSelect } from "@/components/shared/CustomSelect/CustomSelect";
import type { CustomSelectOption } from "@/components/shared/CustomSelect/CustomSelect";
import { StyledButton } from "@/components/shared/StyledButton/StyledButton";
import { useAddProductMutation } from "@/components/Dashboard/hooks/useAddProductMutation";
import { useCategoriesQuery } from "@/components/Dashboard/hooks/useCategoriesQuery";
import {
  addProductFieldOrder,
  addProductValidationSchema,
  type AddProductFieldName,
} from "@/components/Dashboard/utils/validations";
import { cn } from "@/lib/utils/utils";

function inputErrorClass(touched: boolean | undefined, hasError: boolean) {
  return Boolean(touched) && hasError ? "border-red-500 ring-1 ring-red-500" : "";
}

export function AddProductForm() {
  const addMutation = useAddProductMutation();
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategoriesQuery();

  const categoryOptions: CustomSelectOption[] = useMemo(
    () =>
      categories.map((c) => ({
        label: c.charAt(0).toUpperCase() + c.slice(1),
        value: c,
      })),
    [categories],
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    },
    validationSchema: addProductValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      await addMutation.mutateAsync({
        title: values.title.trim(),
        price: parseFloat(values.price),
        description: values.description.trim(),
        image: values.image.trim(),
        category: values.category,
      });
      resetForm();
    },
  });

  const handleAddProductClick = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      formik.setTouched({
        title: true,
        price: true,
        description: true,
        image: true,
        category: true,
      });
      const firstInvalid =
        addProductFieldOrder.find((name) => errors[name]) ??
        (Object.keys(errors)[0] as AddProductFieldName | undefined);
      if (firstInvalid) {
        document
          .querySelector(`[data-dashboard-field="${firstInvalid}"]`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    await formik.submitForm();
  };

  const selectedCategory = useMemo(() => {
    if (!formik.values.category) return null;
    return (
      categoryOptions.find((o) => o.value === formik.values.category) ?? null
    );
  }, [categoryOptions, formik.values.category]);

  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h2 className="mb-4 text-lg font-semibold text-white">Add product</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div data-dashboard-field="title">
          <label className="mb-1 block text-xs font-medium text-white/70">
            Title
          </label>
          <input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={cn(
              "w-full rounded border border-white/20 bg-sys-black px-3 py-2 text-sm text-white outline-none placeholder:text-white/30",
              inputErrorClass(
                formik.touched.title,
                Boolean(formik.errors.title),
              ),
            )}
            placeholder="Product title"
            autoComplete="off"
          />
          {formik.touched.title && formik.errors.title ? (
            <p className="mt-1 text-xs text-red-400">{formik.errors.title}</p>
          ) : null}
        </div>

        <div data-dashboard-field="price">
          <label className="mb-1 block text-xs font-medium text-white/70">
            Price
          </label>
          <input
            name="price"
            inputMode="decimal"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={cn(
              "w-full rounded border border-white/20 bg-sys-black px-3 py-2 text-sm text-white outline-none placeholder:text-white/30",
              inputErrorClass(
                formik.touched.price,
                Boolean(formik.errors.price),
              ),
            )}
            placeholder="0.00"
            autoComplete="off"
          />
          {formik.touched.price && formik.errors.price ? (
            <p className="mt-1 text-xs text-red-400">{formik.errors.price}</p>
          ) : null}
        </div>

        <div
          data-dashboard-field="description"
          className="md:col-span-2"
        >
          <label className="mb-1 block text-xs font-medium text-white/70">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={cn(
              "w-full resize-y rounded border border-white/20 bg-sys-black px-3 py-2 text-sm text-white outline-none placeholder:text-white/30",
              inputErrorClass(
                formik.touched.description,
                Boolean(formik.errors.description),
              ),
            )}
            placeholder="Product description"
          />
          {formik.touched.description && formik.errors.description ? (
            <p className="mt-1 text-xs text-red-400">
              {formik.errors.description}
            </p>
          ) : null}
        </div>

        <div data-dashboard-field="image" className="md:col-span-2">
          <label className="mb-1 block text-xs font-medium text-white/70">
            Image URL
          </label>
          <input
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={cn(
              "w-full rounded border border-white/20 bg-sys-black px-3 py-2 text-sm text-white outline-none placeholder:text-white/30",
              inputErrorClass(
                formik.touched.image,
                Boolean(formik.errors.image),
              ),
            )}
            placeholder="https://…"
            autoComplete="off"
          />
          {formik.touched.image && formik.errors.image ? (
            <p className="mt-1 text-xs text-red-400">{formik.errors.image}</p>
          ) : null}
        </div>

        <div
          data-dashboard-field="category"
          className="md:col-span-2"
        >
          <label className="mb-1 block text-xs font-medium text-white/70">
            Category
          </label>
          <div
            className={cn(
              inputErrorClass(
                formik.touched.category,
                Boolean(formik.errors.category),
              ),
              "rounded-[2px]",
            )}
          >
            <CustomSelect
              placeholder={
                categoriesLoading ? "Loading categories…" : "Select category"
              }
              isDisabled={categoriesLoading || categoryOptions.length === 0}
              options={categoryOptions}
              value={selectedCategory}
              onChange={(opt) => {
                formik.setFieldValue(
                  "category",
                  opt ? (opt as CustomSelectOption).value : "",
                );
              }}
              onBlur={() => formik.setFieldTouched("category", true)}
              instanceId="product-category"
            />
          </div>
          {formik.touched.category && formik.errors.category ? (
            <p className="mt-1 text-xs text-red-400">
              {formik.errors.category}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <StyledButton
          type="button"
          variant="primary"
          onClick={handleAddProductClick}
          disabled={addMutation.isPending}
        >
          {addMutation.isPending ? "Adding…" : "Add product"}
        </StyledButton>
        {addMutation.isError ? (
          <span className="text-sm text-red-400">
            Something went wrong. Try again.
          </span>
        ) : null}
      </div>
    </section>
  );
}
