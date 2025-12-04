import { companyLogo } from "../assets";
import ContactForm from "./ContactForm";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="w-full bg-gradient-to-t from-gray-900 via-transparent to-transparent text-white py-16 mt-20 border-t border-gray-800 relative overflow-hidden"
    >
      {/* Contact Form */}
      <div className="max-w-6xl mx-auto px-6">
        <ContactForm />
      </div>

      {/* Floating logo (separate layer) */}
      <div className="relative w-full flex justify-center -mt-24">
        <img
          src={companyLogo}
          alt="logo"
          className="w-40 max-sm:w-32 opacity-80 hover:opacity-100 transition-all duration-500 ease-in-out drop-shadow-lg"
        />
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-10 mt-12">

        {/* Contact Links */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center">
          <a
            href="whatsapp://send?phone=263786451907"
            target="_blank"
            className="no-underline text-pink-500 flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 bg-opacity-40 hover:bg-opacity-70 transition-all duration-300 shadow-md"
          >
            <i className="fa-brands fa-whatsapp text-green-400 text-xl"></i>
            <span>+ 263 78 645 1907</span>
          </a>

          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 bg-opacity-40 hover:bg-opacity-70 transition-all duration-300 shadow-md">
            <i className="fa-solid fa-phone-volume text-xl "></i>
            <p className="text-pink-500">+ 263 71 562 3873</p>
          </div>
        </div>

        {/* Navigation Links */}

<div className="flex justify-center gap-6 w-full">
  <a
    href="#home"
    className="text-amber-800 px-4 py-2 rounded-lg bg-gray-800 bg-opacity-30 hover:bg-gradient-to-r from-green-400 to-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md cursor-pointer no-underline"
  >
    Home
  </a>
  <a
    href="#services"
    className="text-amber-800 px-4 py-2 rounded-lg bg-gray-800 bg-opacity-30 hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md cursor-pointer no-underline"
  >
    Services
  </a>
</div>


        {/* Social Icons */}
        <div className="flex gap-6 text-xl justify-center mt-2">
          <a
            href="https://www.instagram.com/paharare_advertsing?igsh=MWk0emNsNjhjamN6ZQ=="
            target="_blank"
            className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://www.facebook.com/share/1GGtGcAwmC/"
            target="_blank"
            className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
        </div>

        {/* Footer Text */}
        <p className="text-xs opacity-50 mt-6 text-center max-sm:text-[0.7rem]">
          © {new Date().getFullYear()} Paharare Ads — All rights reserved.
        </p>
      </div>

      {/* Optional subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-400 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
    </footer>
  );
}
