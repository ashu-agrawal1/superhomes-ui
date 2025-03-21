import React from "react";
import { Shield } from "lucide-react";

export default function Cancellation() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {/* <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" /> */}
          <h1 className="text-4xl font-bold text-[#292929]">
            Cancellation and Refund Policy
          </h1>
          <p className="mt-4 text-gray-600">Last updated: 01 March, 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-2">
          <p className="text-gray-600 leading-relaxed mb-6">
            Effective Date: 01-03-2025
          </p>
          <p className="text-gray-600 leading-relaxed">
            At Superhomess Housing, we strive to offer a seamless and
            transparent booking experience. Please review our cancellation and
            refund policy carefully before making a reservation.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Standard Bookings (Within 3 Months of Check-in) Cancellations made
            within 7 days of check-in: Non-refundable. Advance Bookings (More
            than 3 Months in Advance) Cancellations made within 7 days of
            check-in: 50% of the advance payment is non-refundable.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We appreciate your understanding and encourage early planning to
            ensure a smooth and hassle-free booking experience.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For further inquiries, please contact our support team at
            Support@superhomess.com.
          </p>
        </div>
      </div>
    </div>
  );
}
