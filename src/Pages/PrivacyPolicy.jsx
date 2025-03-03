import React from "react";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#292929]">Privacy Policy</h1>
          <p className="mt-4 text-gray-600">Last updated: January 27, 2024</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          <p className="text-gray-600 leading-relaxed">
            Effective Date: 01-03-2025
          </p>
          <p className="text-gray-600 leading-relaxed">
            At Superhomess, your privacy is a priority. We are committed to
            protecting your personal information in compliance with Indian data
            protection laws and ensuring transparency in how we handle your data
          </p>
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Information We Collect
            </h2>
            {/* <p className="text-gray-600 leading-relaxed">
              We collect information that you provide directly to us, including
              but not limited to:
            </p> */}
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
              <li>
                Personal Information: Name, contact details, and address for
                inquiries and account creation.
              </li>
              <li>
                Payment Information: Collected securely through Razorpay for
                transaction processing.
              </li>
              <li>
                Usage Data: Details about how you interact with our website for
                service improvement.
              </li>
              {/* <li>Communication preferences</li> */}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. How We Use Your Information
            </h2>
            {/* <p className="text-gray-600 leading-relaxed">
              We use the information we collect to:
            </p> */}
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
              <li>To process bookings and manage property listings.</li>
              <li>
                To communicate with you about your inquiries or transactions.
              </li>
              <li>To comply with legal obligations or resolve disputes.</li>
              {/* <li>Improve our services</li> */}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Data Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell your information. Data may be shared with:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
              <li>
                Payment gateways like Razorpay for secure transaction
                processing.
              </li>
              <li>
                Service providers involved in facilitating bookings or
                inquiries.
              </li>
              {/* <li>Business partners (with your consent)</li> */}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              You have the right to access, modify, or delete your data. Contact
              us at contact@superhomess.com for assistance.
            </p>
            {/* <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul> */}
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We take reasonable precautions to protect your data, including
              encryption and secure payment gateways.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For detailed information, contact us at contact@superhomess.com.
            </p>
            {/* <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul> */}
          </section>
        </div>
      </div>
    </div>
  );
}
