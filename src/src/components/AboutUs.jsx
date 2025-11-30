import gsap from 'gsap';
import { SplitText} from 'gsap/all'
import { useGSAP } from '@gsap/react'
import './About.css'
import '../../index.css'
import { img10, img11, img12, img13, img14 } from '../assets';
gsap.registerPlugin(SplitText, ScrollTrigger)
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useRef } from "react";
import { useInView } from "framer-motion";


const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  useGSAP(() => {
    if (!isInView) return; // only run animation when visible

    const titleSplit = SplitText.create('#about h2', { type: "words" });

    gsap.from(titleSplit.words, {
      opacity: 0,
      yPercent: 100,
      duration: 0.5,
      stagger: 0.02,
      ease: "expo.out"
    });

    gsap.from(".top-grid div, .bottom-grid div", {
      opacity: 0,
      duration: 1,
      stagger: 0.04,
      ease: "power1.inOut",
      delay: 0.2
    });

  }, [isInView]);
 
 return (
	<div ref={ref} id="about" >
	 <div className="mb-16 md:px-0 px-5 align-middle justify-center items-center">
		<div className="content">
		 <div className="md:col-span-8 ">
			<p className="badge">Best Ads</p>
			<h2 className='science-gothic2'>
			 Where every detail matters <span className="text-white science-gothic2">-</span>
				From rough concepts to polished campaigns
			</h2>
		 </div>
		 
		 <div className="sub-content">
			<p className='text-4xl! purple-purse-regular'>
			We are a full-service creative agency specializing in premium Graphic Design solutions. At our core, we are visual storytellers, driven by the belief that compelling design is the most powerful tool for brand communication. We combine artistic vision with strategic thinking to create designs that don't just look good, but deliver real results.
			</p>
			
			<div>
			 <p className="md:text-3xl text-xl font-bold">
				<span>4.5</span>/5
			 </p>
			 <p className="text-sm text-white-100">
				More than +1000 Ads
			 </p>
			</div>
		 </div>
		</div>
	 </div>
	 
	 <div className="top-grid">
		<div className="md:col-span-3">
		 <div  className=" absolute inset-0 size-full bg-[url(../../../public/noise.png)]" />
		 <img src={img13} alt="grid-img-1" loading='lazy' />
		</div>
		
		<div className="md:col-span-6">
		 <div  className=" absolute inset-0 size-full bg-[url(../../../public/noise.png)]" />
		 <img src={img10} alt="grid-img-2" loading='lazy' />
		</div>
		
		<div className="md:col-span-3">
		 <div  className=" absolute inset-0 size-full bg-[url(../../../public/noise.png)]" />
		 <img src={img12} alt="grid-img-5" loading='lazy' />
		</div>
	 </div>
	 
	 <div className="bottom-grid">
		<div className="md:col-span-8">
		 <div  className=" absolute inset-0 size-full bg-[url(../../../public/noise.png)]" />
		 <img src={img11} alt="grid-img-3" loading='lazy'/>
		</div>
		
		<div className="md:col-span-4">
		 <div  className=" absolute inset-0 size-full bg-[url(../../../public/noise.png)]" />
		 <img src={img14} alt="grid-img-4" loading='lazy' />
		</div>
	 </div>
	 
	</div>
 )
}
export default About