"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useContext } from 'react';
import { BookingContx } from '@/context/BookingContext'
import QRCodeComponent from '@/components/QrCode'
import { IoMdDoneAll } from "react-icons/io";
import { motion } from 'framer-motion'

import { movies_data } from '@/sample/data';
import Spinner from '@/components/Spinner'


export default function PaymentPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false);
  const [emailId, setEmailId] = useState(null);

  const { selectedSeats, handleReset, movieId } = useContext(BookingContx);
  const [paymentId, setPaymentId] = useState(null);

  if (selectedSeats.length === 0 && paymentId === null) {
    console.log(selectedSeats.length)
    router.push('/movies')
  }



  const makePayment = async () => {
    setLoading(true)
    console.log("here...");
    console.log(emailId)
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", { method: "POST" }, {
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if required
      },
    }).then((t) =>
      t.json()
    );
    console.log(data);

    var options = {
      key: process.env.RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
      name: "Be Watcher - Movie Ticket",
      currency: "INR",
      amount: 5000,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: "https://manuarora.in/logo.png",
      callback_url: 'http://localhost:3000/api/payment-response',

      handler: function (response) {
        console.log(response)
        setLoading(false)
        // router.push("/payment-response?paymentid=" + response.razorpay_payment_id)
        // setPaymentStatus({ paymentId: response.razorpay_payment_id })
        setPaymentId(response.razorpay_payment_id)
        // handleReset()


      },
      prefill: {
        name: "Prasad Gurav",
        email: "psgurav2001@gmail.com",
        contact: "9561242048",
      },
    };
    const paymentObject = new window.Razorpay(options);
    if (paymentObject !== undefined | null) {
      paymentObject.open();
      paymentObject.on("payment.failed", function (response) {
        alert("Payment failed. Please try again. Contact support for help");
      });
    }

  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  console.log(paymentId)
  return (
    <>

      {paymentId === null ?
        <div className='w-[90%] md:w-[60%] mx-auto flex flex-col  border-2 border-gray-600 p-6 gap-4 font-lato my-5'>
          <h2 className='text-2xl font-lato text-center text-gray-500'>Get Your Ticket</h2>
          <img className='w-[20%] rounded-md' src={`https://image.tmdb.org/t/p/w500${movies_data[Number(movieId)].poster_path}`} alt="" />
          <h2 className='text-xl'>Movie : {movies_data[Number(movieId)].original_title}</h2>
          <h2>Seats : {selectedSeats.join(', ')}</h2>
          <p>Enter Your Email Here :</p>
          <input type="email" onChange={(e) => { setEmailId(e.target.value) }} name="" id="" className='w-full md:w-[70%] px-2 rounded-md bg-transparent border-2 border-white placeholder:font-poppins' placeholder='youremail@mail.com' />

          <button onClick={makePayment} className={`w-[40%] md:w-[30%] py-1 bg-blue-500 font-lato rounded-md `}>
            {loading ? <Spinner
            /> : <>Pay</>}
          </button>
        </div> :
        <>
          <div className='border-2 border-green-500 w-[90%] md:w-[30%]  flex flex-col gap-4 rounded-md px-2 my-4 py-5 mx-auto items-center'>
            <h2 className='text-2xl text-center py-3'>Payment Successfull</h2>
            <div className='font-lato text-sm text-gray-600'>
              Ticket Details has been sent to your email.
            </div>
            <motion.div className='w-full' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }}>
              <IoMdDoneAll className='fill-green-500 mx-auto' size={98} />
            </motion.div>
            <div className='text-xl font-lato px-2'>
              <h4 className='text-gray-500 text-sm'>Booking Details</h4>
              <h4>Seats Booked : {selectedSeats.join(', ')}</h4>
            </div>
            {selectedSeats.length > 0 ? <QRCodeComponent value={selectedSeats.toString()} size={256} /> : <></>}
          </div>
        </>}

    </>
  );
}
