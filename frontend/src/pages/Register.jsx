import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import useRegisterUser from "../Hooks/useRegisterUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Register() {
  const { mutate } = useRegisterUser();
  const navigate = useNavigate();
  const [btn, setBtn] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({ mode: "all" });

  // Login function
  const onSubmit = (data) => {
    mutate(data);
    console.log(data);
    reset();
    navigate("/login");
  };

  const handleNext = () => {
    setBtn(true);
  };

  return (
    <>
      <div className="flex justify-center content-center items-center w-full  m-2 mt-5">
        <div className="flex rounded-md border w-96 border-zinc-200 flex-col p-6">
          {btn && (
            <IoMdArrowRoundBack
              className="text-2xl cursor-pointer "
              onClick={() => setBtn(false)}
            />
          )}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900">
              Register
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {!btn && (
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "Name is required",
                          },
                          minLength: {
                            value: 2,
                            message: "Name cannot 2 characters",
                          },
                        })}
                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.name && (
                        <p className="px-2 text-sm text-red-600 py-1 ">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email is required",
                          },
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        })}
                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.email && (
                        <p className="px-2 text-sm text-red-600 py-1 ">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-zinc-900"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2 ">
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          {...register("password", {
                            required: {
                              value: true,
                              message: "Password is required",
                            },
                            pattern: {
                              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                              message:
                                "Minimum eight characters, at least one letter and one number",
                            },
                          })}
                          className="pl-2 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </div>
                      </div>

                      {errors.password && (
                        <p className="px-2 text-sm text-red-600 py-1 ">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      disabled={!isDirty || !isValid}
                      onClick={handleNext}
                      type="button"
                      className="flex mt-4 w-full justify-center rounded-md bg-mycolornew px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {btn && (
                <div className="space-y-4">
                  {/* street */}
                  <div>
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Street
                    </label>
                    <div className="mt-2">
                      <input
                        id="street"
                        name="street"
                        type="text"
                        {...register("street", {
                          required: {
                            value: true,
                            message: "street is required",
                          },
                          minLength: {
                            value: 2,
                            message: "street cannot 2 characters",
                          },
                        })}
                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.street && (
                        <p className="px-2 text-sm text-red-600 py-1 ">
                          {errors.street.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* city */}
                  <div>
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        id="city"
                        name="city"
                        type="text"
                        {...register("city", {
                          required: {
                            value: true,
                            message: "city is required",
                          },
                          minLength: {
                            value: 2,
                            message: "city cannot 2 characters",
                          },
                        })}
                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.city && (
                        <p className="px-2 text-sm text-red-600 py-1 ">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* pincode */}
                  <div>
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Pincode
                    </label>
                    <div className="mt-2">
                      <input
                        id="pincode"
                        name="pincode"
                        type="number"
                        {...register("pincode", {
                          required: {
                            value: true,
                            message: "pincode is required",
                          },
                          minLength: {
                            value: 6,
                            message: "pincode should be 6 characters",
                          },
                        })}
                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.pincode && (
                        <p className="px-2 text-sm text-red-600 py-1 ">
                          {errors.pincode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        type="number"
                        {...register("phone", {
                          required: {
                            value: true,
                            message: "phone is required",
                          },
                          minLength: {
                            value: 10,
                            message: "phone should be 10 characters",
                          },
                        })}
                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.phone && (
                        <p className="px-2 text-sm text-red-600 py-1 ">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex mt-4 w-full justify-center rounded-md bg-mycolornew px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {isSubmitting ? "Submitting" : "Submit"}
                  </button>
                </div>
              )}
            </form>

            <p className="mt-10 text-center text-sm text-zinc-500">
              <Link
                to={"/login"}
                className="font-semibold leading-6 text-indigo-300 hover:text-indigo-500"
              >
                Have a account, login yourself
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
