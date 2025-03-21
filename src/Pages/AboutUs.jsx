import React from "react";
import { Shield } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {/* <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" /> */}
          <h1 className="text-4xl font-bold text-[#292929]">About Us</h1>
          <p className="mt-4 text-gray-600">Last updated: 01 March, 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-2">
          <p className="text-gray-600 leading-relaxed mb-6">
            Effective Date: 01-03-2025
          </p>
          <p className="text-gray-600 leading-relaxed">
            Welcome to Superhomess – Your Trusted Housing and Property
            Management Partner
          </p>
          <p className="text-gray-600 leading-relaxed">
            At Superhomess, we specialize in delivering comprehensive housing
            solutions and property management services, ensuring a seamless
            experience for homeowners, tenants, and investors alike.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With expertise in short-term rental housing, corporate leasing,
            property transactions, and rental brokerage, we offer tailored
            solutions designed to meet diverse client needs. Our commitment to
            excellence extends to construction and renovation, ensuring every
            housing project meets the highest standards of quality,
            functionality, and aesthetic appeal.
          </p>
          <p className="text-gray-600 leading-relaxed">
            At Superhomess, we believe in maximizing property value while
            simplifying management processes. Through innovation,
            professionalism, and personalized service, we transform housing
            experiences—making every transaction, lease, or renovation
            effortless and rewarding.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Discover the future of housing and real estate with Superhomess
          </p>
        </div>
      </div>
    </div>
  );
}
