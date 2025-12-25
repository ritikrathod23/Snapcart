import React from 'react'
import { useForm } from 'react-hook-form'
import Parchase from '../components/Parchase'
import toast, { Toaster } from 'react-hot-toast'

function UserDetails() {
  const {register, handleSubmit} = useForm()

  const handleClick = (data) => {
    console.log(data)
    toast.success("Order Placed");

  }

  return (
    <>
    <Toaster position="top-center" />
    {/* <div>
    <h1 className='text-center'>Check Out</h1>
    </div> */}
    <div className='md:grid grid-cols-3 gap-4 w-full m-5' >
    <div className=' mt-4 w-full p-5 col-span-2  border-2 border-gray-300 rounded-md' >
      <h1 className='text-3xl font-semibold text-start my-4'>Billing Address</h1>
      <form onSubmit={handleSubmit(handleClick)} className='flex flex-col justify-center items-start gap-2'>
        <div className='flex justify-around items-center content-center gap-5 w-full'>
          <div className='flex justify-  items-start flex-col w-full '>
            <label htmlFor="">First Name</label>
            <input className='w-full rounded-md' type="text" {...register("first name" ,{
              required: true,
              maxLength: 20
            })} />
          </div>
          <div  className='flex justify-center items-start flex-col w-full'>
            <label htmlFor="">Last Name</label>
            <input className='w-full rounded-md' type="text" {...register("last name" ,{
              required: true,
              maxLength: 20
            })} />
            </div>
          </div>
    
          <label htmlFor="">Email</label>
          <input className='w-full rounded-md' type="email"{...register("email", {
            required: true,
            
          })} />
    
    
          <label htmlFor="">Password</label>
          <input className='w-full rounded-md' type="password" {...register ("password", {
            required: true,
            minLength: 8
          })} />
      
      
          <label htmlFor="">Address</label>
          <input className='w-full rounded-md' type="text" {...register("address" ,{
            required: true,
            maxLength: 30
          })} />
    
      
          <label htmlFor="">Pincode</label>
          <input className='w-full rounded-md' type="number" {...register("pincode" ,{
            required: true,
            maxLength: 6,
          })} />
        <div className='flex justify-around items-center content-center gap-5 w-full'>
          <div className='flex flex-col w-full'>
          <label className='my-2' htmlFor="">Country</label>
          <select className='rounded-md h-10 px-2'
           name="country" id="country"
           {...register("country", {
            required: true,
           })}>
            <option value="">Choose...</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="EUROPE">EUROPE</option>
            <option value="RUSSIA">RUSSIA</option>
          </select>
          </div>
          <div className='flex flex-col w-full'>
          <label className='my-2' htmlFor="">State</label>
          <select className='rounded-md h-10 px-2'
           name="state" id="state"
           {...register("state", {
            required: true,
           })}>
            <option value="">Choose...</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Maharastra">Maharastra</option>
            <option value="Uttat Pradesh">Uttat Pradesh</option>
          </select>
          </div>

        </div>
    
          
        <button  type='submit' className=" rounded-md my-4 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 py-4 hover:bg-gray-700">
          Check Out
        </button>
      </form>
    </div>
    <div className='flex justify-center'> 
    <Parchase button={false}  />
    </div>
    </div>
    </>
  )
}

export default UserDetails
