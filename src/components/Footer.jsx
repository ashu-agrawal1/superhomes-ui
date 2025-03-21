import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Mail, Phone, Instagram } from "lucide-react";
import whiteTypo from "../assets/WHITETTYPO.png";

const Footer = () => {
  return (
    <footer className="w-full py-8 bg-gradient-to-r from-blue-900 to-blue-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-10">
          {/* White Typo Logo */}
          <img src={whiteTypo} alt="Logo" className="w-52 sm:w-64 md:w-72" />

          {/* Navigation Links */}
          <nav className="flex flex-col sm:flex-row sm:space-x-4 text-gray-200 justify-center sm:justify-start">
            <Link
              to="/contactus"
              className="hover:text-white transition-colors mb-2 sm:mb-0"
            >
              Contact Us
            </Link>
            <span className="text-gray-400 hidden sm:block">|</span>
            <Link
              to="/privacy-policy"
              className="hover:text-white transition-colors mb-2 sm:mb-0"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400 hidden sm:block">|</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-gray-400 hidden sm:block">|</span>
            <Link to="/aboutus" className="hover:text-white transition-colors">
              About Us
            </Link>
            <span className="text-gray-400 hidden sm:block">|</span>
            <Link
              to="/cancel-policy"
              className="hover:text-white transition-colors"
            >
              Cancellation and Refund Policy
            </Link>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-4 sm:gap-6">
            {/* <Link
              to=""
              className="text-gray-200 hover:text-white transition-colors"
            >
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="sr-only">Facebook</span>
            </Link> */}
            <Link
              to="https://www.instagram.com/Superhomess_33"
              target="_blank"
              className="text-gray-200 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              to="mailto:contact@superhomess.com"
              className="text-gray-200 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="sr-only">Email</span>
            </Link>
            <Link
              to="tel:+919301696266"
              className="text-gray-200 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="sr-only">Phone</span>
            </Link>
          </div>

          {/* Facebook Disclaimer */}
          <p className="text-sm text-gray-300 text-center max-w-2xl">
            This site is not a part of the Facebook website or Facebook Inc.
            Additionally, This site is NOT endorsed by Facebook in any way.
            FACEBOOK is a trademark of FACEBOOK, Inc.
          </p>

          {/* Copyright */}
          <p className="text-sm text-gray-300">
            ©{new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
