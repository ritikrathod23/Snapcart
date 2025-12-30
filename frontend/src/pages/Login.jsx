import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useLogin from "../Hooks/useLogin";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import toast, { Toaster } from "react-hot-toast";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isLoading } = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "all" });

  // Login function
  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        if (data) navigate("/");
      },
      onError: (error) => {
        console.log("error1", error);
        toast.error("Invalid Credentials");
      },
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex justify-center content-center items-center w-full  m-2 mt-5">
        <div className="flex rounded-md border w-96 border-zinc-200 flex-col p-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900">
              Log in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-300 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
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
                        <VisibilityOffIcon color="action" />
                      ) : (
                        <VisibilityIcon color="action"  />
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
                {/* <label htmlFor="isAdmin">admin</label> */}
                <Controller
                  name="isAdmin"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Switch
                      id="isAdmin"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="default"
                      {...register("isAdmin")}
                    />
                  )}
                />
              </div>

              <div>
                <Button
                  className="flex w-full justify-center rounded-md !bg-mycolornew px-3 py-1.5 text-sm font-semibold leading-6 !text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  fullWidth
                  loading={isLoading}
                  variant="contained"
                  loadingPosition="start"
                  // disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Login-ing" : "Login"}
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-zinc-500">
              <Link
                to={"/register"}
                className="font-semibold leading-6 text-indigo-300 hover:text-indigo-500"
              >
                Don't have a account, register yourself
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
