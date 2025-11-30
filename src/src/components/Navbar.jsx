import {useEffect} from "react";
import "../Navbar.css";
// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion'
import { companyLogo } from "../assets";
import { useRef, useState } from "react";
import WaveMenu from "./Menu";



export const SlideTabsExample = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960);
    };

    window.addEventListener("resize", handleResize);

    
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={isMobile ?  "mr-20" :"bg-transparent py-30 "}>
      {isMobile ? <WaveMenu /> : <SlideTabs />}
    </div>) }

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
        className="
    relative flex items-center 
    bg-transparent rounded-full border border-white/30
    w-fit
    mr-15
    px-1.5 py-1  
    gap-1
    backdrop-blur-md
    mx-auto
  "
    >
     <a className="no-underline" href='#home'> <Tab setPosition={setPosition}>Home</Tab></a> 
     <a className="no-underline" href="#about"> <Tab setPosition={setPosition}>About </Tab></a> 
     <a className="no-underline" href="#contact"> <Tab setPosition={setPosition}>Contact</Tab></a> 
     <a className="no-underline" href='#services'> <Tab setPosition={setPosition}>Services</Tab></a> 

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
       className="
    relative z-10 px-2 py-1 uppercase cursor-pointer 
    text-white text-[0.65rem] 
    md:text-xs md:px-3 md:py-1.5
  "
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
        className="
    absolute z-0 h-5 md:h-7 
    rounded-full bg-black mix-blend-difference
  "
    />
  );
};



export default function Navbar() {
  return (
    <nav className="navbar w-full flex items-center justify-between px-6 py-4">
      <img 
        src={companyLogo}
        className="w-20 md:w-32 logo"
      />
     <SlideTabsExample/>
            
    </nav>
  );
}





