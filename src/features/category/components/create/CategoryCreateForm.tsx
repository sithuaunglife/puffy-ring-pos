"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import useCategoryCreate from "../../hooks/useCategoryCreate";
import Link from "next/link";

function CategoryCreateForm() {
  const { onSubmit, handleSubmit, control, reset } = useCategoryCreate();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=" w-1/2 space-y-6">
        <FieldGroup className=" grid grid-cols-2">
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Category Name</FieldLabel>
                <Input
                  className="border-slate-400"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup className="space-y-8">
          <Controller
            name="confirm"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-2">
                  <Checkbox
                    className="border border-slate-900 cursor-pointer"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="confirm-check"
                  />
                  <FieldLabel htmlFor="confirm-check">
                    I confirm creating new category.
                  </FieldLabel>
                </div>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Field className=" col-span-full" orientation="horizontal">
            <Link href={`/categories`}>
              <Button
                className="px-4 py-2 border-pink-600 text-neutral-500 cursor-pointer"
                variant="outline"
                type="button"
              >
                Cancel
              </Button>
            </Link>

            <Button
              className="px-4 py-2 bg-pink-500 border-pink-600 text-white cursor-pointer"
              type="submit"
            >
              Create
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}

export default CategoryCreateForm;
