import React from "react";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import useAddProduct from "../../Hooks/useAddProduct";
import toast, { Toaster } from "react-hot-toast";

function AddProduct() {
  const { mutate } = useAddProduct();

  const {
    register,
    handleSubmit,
    // control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "all" });

  const formSubmit = (data) => {
    console.log("form data", data.pSize);
    const formDataValues = {
      pName: data.pName,
      pDescription: data.pDescription,
      pCategory: data.pCategory,
      pPrice: data.pPrice,
      pQuantity: data.pQuantity,
      pOffer: data.pOffer,
      pSize: data.pSize,
      pStatus: data.pStatus,
      file: data.pImage[0], // <-- pick the first file
    };

    mutate(formDataValues, {
      onSuccess: () => {
        toast.success("Product added Successfully!");
        reset();
      },
      onError: () => {
        toast.error("Error adding product");
      },
    });

    console.log(data);
  };

  const handleReset = () => {
    console.log("reset");
    reset();
  }

  return (
    <>
      <div className="flex justify-center items-center w-screen">
        <Toaster position="top-center" />
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="p-5 flex gap-4 flex-wrap border-solid border w-full h-full  "
        >
          <div className="w-full">
            <label htmlFor="product name">Product Name</label>
            <input
              className="w-full h-8 px-4 border border-gray-300 rounded"
              placeholder="Product Name"
              type="text"
              {...register("pName", {
                required: {
                  value: true,
                  message: "Product name is required",
                },
              })}
            />
            {errors.pName && (
              <p className="text-red-700 py-1 ">Product name is required.</p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="product name">Product Description</label>
            <textarea
              className="w-full  h-auto px-4 border border-gray-300 rounded"
              placeholder="Description"
              type="text"
              {...register("pDescription", {
                required: {
                  value: true,
                  message: "Description is required",
                },
              })}
            />
            {errors.pDescription && (
              <p className="text-red-700 py-1 ">
                Product description is required.
              </p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="product name">Category</label>
            <input
              className="w-full h-8 px-4 border border-gray-300 rounded"
              placeholder="Category"
              type="text"
              {...register("pCategory", {
                required: {
                  value: true,
                  message: "Category name is required",
                },
              })}
            />
            {errors.pCategory && (
              <p className="text-red-700 py-1 ">Product name is required.</p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="price">Price</label>
            <input
              name="price"
              className="w-full h-8 px-4 border border-gray-300 rounded"
              placeholder="Price"
              type="text"
              {...register("pPrice", {
                required: {
                  value: true,
                  message: "Price name is required",
                },
              })}
            />
            {errors.pPrice && (
              <p className="text-red-700 py-1 ">Product name is required.</p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="offers">Offers</label>
            <input
              name="offers"
              className="w-full  h-8 px-4 border border-gray-300 rounded"
              placeholder="Offers"
              type="text"
              {...register("pOffer")}
            />
          </div>

          <div className="w-full">
            <label htmlFor="quantity">Product Quantity</label>
            <input
              name="quantity"
              className="w-full  h-8 px-4 border border-gray-300 rounded"
              placeholder="Quantity"
              type="number"
              {...register("pQuantity", {
                valueAsNumber: true,

                required: { value: true, message: "Quantity is required" },
                min: { value: 1, message: "Minimum quantity is 1" },
              })}
            />
            {errors.pQuantity && (
              <p className="text-red-700 py-1 ">
                Product Quantity is required.
              </p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="product status">Product Status</label>
            <select
              className="w-full cursor-pointer  h-8 px-4 border border-gray-300 rounded"
              name="product status"
              placeholder="choose status"
              {...register("pStatus", {
                required: {
                  value: true,
                  message: "Status is required",
                },
              })}
            >
              <option disabled={true}>--- choose status ----</option>
              <option name="Available" id="">
                Available
              </option>
              <option name="Not Available" id="">
                Not Available
              </option>
            </select>
          </div>

          <div className="w-full">
            <label htmlFor="image">Product Images</label>
            <input
              name="image"
              id="image"
              className="w-full  h-8 px-4 border border-gray-300 rounded"
              placeholder="Images"
              type="file"
              {...register("pImage", { required: true })}
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

            <button className=" rounded bg-mycolor p-2 w-44">
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
        {/* <DevTool control={control} /> */}
      </div>
    </>
  );
}

export default AddProduct;
