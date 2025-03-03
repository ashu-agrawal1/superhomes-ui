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
            Welcome to Superhomess, your trusted partner in property management
            and real estate solutions
          </p>
          <p className="text-gray-600 leading-relaxed">
            At Superhomess, we pride ourselves on delivering exceptional
            services that cater to a wide range of client needs, whether it’s
            managing short-term rental properties, offering corporate leasing
            solutions, facilitating property transactions, or providing rental
            brokerage services.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our expertise extends to construction and renovation projects,
            ensuring every property meets the highest standards of quality and
            functionality. With a commitment to client satisfaction, we aim to
            simplify property management while maximizing the value of your
            investment
          </p>
          <p className="text-gray-600 leading-relaxed">
            Explore a seamless blend of professionalism, innovation, and
            personalized service at Superhomess.
          </p>
        </div>
      </div>
    </div>
  );
}
