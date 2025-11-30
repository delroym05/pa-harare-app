/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import HeroCards from './HeroCards'
import { useState } from "react";
import Services from "./pages/Services";
import About from "./AboutUs";
import Footer from "./Footer";





export default function HeroSection() {
const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
  //
  return (
    <div >
      <HeroCards  className="absolute inset-0 size-full bg-[url('../../../public/noise.png')]"/>
       <About/>
      <Services/>
      <Footer/>
    </div>
  )
}

