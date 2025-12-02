/* eslint-disable no-unused-vars */
import React from 'react'
import  { useState, useEffect } from "react";
import { motion, AnimatePresence} from "framer-motion";
import "./HeroCard.css";
import "./HeroSection.css";
import '../../index.css'
import HeroSlider from './HeroSlider';




export default function HeroCards() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 560);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 560);
      };
  
      window.addEventListener("resize", handleResize);
  
      
      handleResize();
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

 
  const words = ["Logo Designing", "Branding", "Letterhead",
                "Marketing","Business Cards",
                  "Business Marketing Ads"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 4000); // switch every 2 seconds
    return () => clearInterval(interval);
  }, [words.length]);
   
  return (
    <div>    
    <motion.div
      className="hero-container"
    >
    <section className="hero-section">
      <div className={isMobile ?'h-52': 'h-54'}/>

      <HeroSlider/>
    <div className='mt-5 h-1.5 flex flex-col '>
      <h1 className="hero-title">
       <span>OFFERING</span>
      </h1>

{isMobile &&   (<AnimatePresence>
        <motion.div 
            className="hero-rotating-text" 
            key={words[index]} initial="hidden" 
            animate="visible" 
            variants={
              { visible: 
                { transition:
                  { staggerChildren: 2,
                    repeat: Infinity, },
                      }, 
                      }} >
                  
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    className="rotating-word"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1,  ease:'easeIn'}}
                  >
                    {words[index]}
                  </motion.span>
              </AnimatePresence>
              </motion.div>

          </AnimatePresence>
      )}
      
      
     

</div>

        </section>
      </motion.div>

    </div>
  )
}
