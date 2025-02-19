import React from "react";
import { FileText } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-gray-600">Last updated: January 27, 2024</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          <p className="text-gray-600 leading-relaxed">
            Effective Date: 01-03-2025
          </p>
          <p className="text-gray-600 leading-relaxed">
            Welcome to Superhomess! By using our services, you agree to the
            following terms:
          </p>
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Payment Policy</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                To confirm bookings, the full amount and a refundable security
                deposit must be paid at booking.
              </li>
              <li>
                For bookings made at least 3 months in advance, 50% of the
                amount is required upfront. The balance and security deposit
                must be paid 7 days before check-in.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Cancellation and Refund Policy
            </h2>
            <div className="space-y-4 text-gray-600">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Standard Bookings (within 3 months)</li>
                <li>Cancellation within 7 days of check-in: Non-refundable.</li>
                <li>Advance Bookings (3+ months in advance)</li>
                <li>
                  Cancellation within 7 days of check-in: 50% advance is
                  non-refundable.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. Refundable Security Deposit
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Refunded post-checkout after inspection of the property.
              Deductions may apply for damages or violations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Property Listings
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Users agree to provide accurate information when listing
                properties.
              </li>
              <li>
                Superhomess reserves the right to approve, reject, or remove
                listings.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. House Rules</h2>
            <p className="text-gray-600 leading-relaxed">
              Guests and property owners must adhere to the house rules provided
              at the time of booking or property listing.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Force Majeure</h2>
            <p className="text-gray-600 leading-relaxed">
              Superhomess is not liable for cancellations caused by unforeseen
              events such as natural disasters or government restrictions.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Acknowledgment</h2>
            <p className="text-gray-600 leading-relaxed">
              By using our services, you agree to these terms and conditions.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For questions, contact us at contact@superhomess.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
