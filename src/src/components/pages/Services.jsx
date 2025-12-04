/* eslint-disable no-unused-vars */
import React from 'react'
import Cards from '../Cards'
import { Example } from '../MouseImageTrail'
import {motion} from 'framer-motion'
import { Element } from 'react-scroll'
import '../../../index.css'
import VerticalAccordion from '../Accordion'
import HeroCards from '../HeroCards'
import { useEffect, useState } from 'react'


export default function Services() {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 960);
      };
  
      window.addEventListener("resize", handleResize);
  
      
      handleResize();
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

   const services = [
  { title: "Digital Marketing", desc: "Banners, flyers & posters." },
{ title: "Flyer & Poster Design", desc: "Eye-catching flyers and posters for any occasion." },
{ title: "Video Editing", desc: "Clean, professional edits with effects, color work & smooth transitions." },
{ title: "Digital Editing", desc: "Photo retouching, manipulations, and creative enhancements." },
];


  return (
    <Element id='services'  smooth='true' duration={500}>
      <div className='flex flex-col gap-5'>
      <div className="services-section" >
      <h2 className="text-center text-3xl font-bold mb-8 science-gothic text-cyan-450 ">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-6 bg-amber-200 backdrop-blur-md rounded-2xl text-center science-gothic shadow-lg"
          >
            <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
            <p>{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
        
        {isMobile ? <VerticalAccordion/> : <Example/>}
        <Cards/>
        </div>
</Element>
  )
}
