import { companyLogo } from "../assets";

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-transparent text-white py-10 mt-20 border-t border-transparent">
      

        <img 
          src={companyLogo}
          alt="logo"
          className=" mb-[-10rem] max-sm:items-center align w-40 opacity-80 max-sm:w-30"
        />
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-0">

  
<div className="ml-15 opacity-70 hover:opacity-100 transition flex items-center gap-2">
  <a
    href="whatsapp://send?phone=263786451907"
    target="_blank"
    className="flex items-center gap-2 no-underline text-inherit"
  >
    <i className="fa-brands fa-whatsapp text-green-400 text-xl"></i>
    <span>+ 263 78 645 1907</span>
  </a>
</div>


          <div className=" ml-15 opacity-70 hover:opacity-100 transition flex items-center gap-2" >
          <i className=" fa-solid fa-phone-volume">  </i> <p>  +263 71 562 3873</p>
          </div>

          <ul className=" ml-2 flex gap-6 text-sm opacity-80">
          <a href='#home' className="hover:opacity-100 transition cursor-pointer no-underline">Home</a>
          <a href="#services" className="hover:opacity-100 transition cursor-pointer no-underline">Services</a>
        </ul>

        <div className="ml-10 flex gap-4 text-xl">
          <a className="opacity-70 hover:opacity-100 transition"
           href="https://www.instagram.com/paharare_advertsing?igsh=MWk0emNsNjhjamN6ZQ==" 
            target="_blank"
             >
            
              <i className="fa-brands fa-instagram"/>
              </a>
          <a className="opacity-70 hover:opacity-100 transition" 
          href="https://www.facebook.com/share/1GGtGcAwmC/">
            <i className="fa-brands fa-facebook"></i>
          </a>
        </div>

        <p className="ml-16 text-xs opacity-50 mt-4 max-md:text-base max-sm:text-xs">
          © {new Date().getFullYear()} Paharare Ads — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
