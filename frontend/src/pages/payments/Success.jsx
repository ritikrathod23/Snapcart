import { useNavigate } from "react-router-dom";
import useGetPaymentConfirmation from "../../Hooks/useGetPaymentConfirmation";
import toast, { Toaster } from "react-hot-toast";

const Success = () => {
  const { data: message, isLoading, isSuccess } = useGetPaymentConfirmation();
  toast.success("Order Placed Successfully")
  const navigate = useNavigate()

  return (
    <div className="flex p-12 flex-col gap-3 justify-center items-center  h-4/6">
      {isSuccess && <Toaster position="top-center" />}
      <h1 className="text-2xl">Payment Successful!</h1>
      {isLoading && (
        <div>
          <p> Placing Order please wait </p>
          <p>Do not close the window</p>
        </div>
      )}
      <p className="text-xl"> {message?.message}</p>
      <button
        onClick={navigate("/")}
        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-mycolornew w-40 py-4 hover:bg-gray-700"
      >
        Go to Shopping
      </button>
      {/* <button className=""></button> */}
    </div>
  );
};

export default Success;
