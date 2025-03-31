import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRazorpayOrder } from '../Redux/PaymentSlice'; // Path to your slice
import { useNavigate } from 'react-router-dom';

const RazorCheck = ({ property, numberOfGuests, newAvailability }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { razorpayOrder, loading, error } = useSelector((state) => state.payment);
  
  useEffect(() => {
    const loadRazorpayScript = () => {
      if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay script loaded");
        script.onerror = () => console.error("Failed to load Razorpay script");
        document.body.appendChild(script);
      }
    };
    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    try {
      // Hardcoding the order details as you mentioned
      const amount = 15000; // Price in paise (1500 INR)
      const start_date = "2024-12-30";
      const end_date = "2024-12-31";

      // Prepare hardcoded order data
      const orderData = {
        amount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        user_id: 1, // Hardcoded user_id
        property_id: 12, // Hardcoded property_id
        start_date,
        end_date,
      };

      // Dispatch createRazorpayOrder action to create the order
      const order = await dispatch(createRazorpayOrder(orderData)).unwrap();
      if (!order || !order.id) {
        alert('Failed to create Razorpay order');
        return;
      }

      // Open Razorpay modal
      const options = {
        key: 'rzp_live_n4Audjbv7adHaH', // Your Razorpay key
        amount: order.amount, // Amount in paise
        currency: order.currency,
        order_id: order.id,
        name: 'Property Payment',
        description: `Payment for ${numberOfGuests} guest(s) at ${property?.name}`,
        image: property?.image || 'URL_OF_YOUR_PROPERTY_IMAGE', // Replace with a valid image URL if available
        handler: async (response) => {
          // Handle success, create reservation
          const reservationData = {
            property_id: 12, // Hardcoded property_id
            start_date,
            end_date,
            number_of_guests: numberOfGuests,
            payment_id: response.razorpay_payment_id,
          };
          // Dispatch createReservation action (add it to your slice)
          alert('Payment successful! Booking confirmed.');
          navigate('/cart'); // Navigate to confirmation page
        },
        prefill: {
          name: 'Test User', // Replace with dynamic user data
          email: 'testuser@example.com',
          contact: '9876543210',
        },
        notes: {
          address: 'Test address', // Replace with dynamic address if available
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (response) => {
        alert(`Payment failed: ${response.error.description}`);
      });

      razorpay.open();  // Open Razorpay modal
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating payment order');
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-500 text-white p-4 rounded-md"
      >
        {loading ? 'Processing Payment...' : 'Proceed to Payment'}
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default RazorCheck;
