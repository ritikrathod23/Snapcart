import React from "react";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import useAddCategory from "../../Hooks/useAddCategory";
import toast, { Toaster } from "react-hot-toast";

function AddCategory() {
  const { mutate, isPending } = useAddCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "all" });

  const formSubmit = async (data) => {
    console.log(data);
    const formDataValues = {
      cName: data.cName,
      cDescription: data.cDescription,
      file: data.cImage[0], // <-- pick the first file
    };

    try {
      await mutate(formDataValues, {
        onSuccess: () => {
          toast.success("Category added Successfully!");
          reset();
        },
        onError: () => {
          alert("Error adding product");
        },
      });
    } catch (error) {
      console.error("Error adding category", error);
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <>
      <div className="flex pt-5 pr-3 justify-center items-center w-screen">
        <Toaster position="top-center" />
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="p-5 flex gap-4 flex-wrap border-solid border w-full h-full  "
        >
          <div className="w-full">
            <label htmlFor="category name">Category Name</label>
            <input
              className="w-full h-8 px-4 border border-gray-300 rounded"
              placeholder="Category Name"
              type="text"
              {...register("cName", {
                required: {
                  value: true,
                  message: "Category name is required",
                },
              })}
            />
            {errors.cName && (
              <p className="text-red-700 py-1 ">{errors.cName.message}</p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="product name">Category Description</label>
            <textarea
              className="w-full  h-auto px-4 border border-gray-300 rounded"
              placeholder="Description"
              type="text"
              {...register("cDescription", {
                required: {
                  value: true,
                  message: "Description is required",
                },
              })}
            />
            {errors.cDescription && (
              <p className="text-red-700 py-1 ">
                {errors.cDescription.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="image">Product Images</label>
            <input
              name="image"
              id="image"
              className="w-full  h-8 px-4 border border-gray-300 rounded"
              placeholder="Images"
              type="file"
              {...register("cImage", { required: true })}
            />
          </div>

          <div className="flex items-end gap-4 w-full justify-end ">
            <button
              onClick={handleReset}
              type="button"
              className=" rounded p-2 w-44"
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className=" rounded bg-mycolor p-2 w-44"
            >
              {isSubmitting || isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
        {/* <DevTool control={control} /> */}
      </div>
    </>
  );
}

export default AddCategory;
