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

  useEffect(() => {
  const sections = ["home", "about", "contact", "services"];

  const handleScroll = () => {
    let current = "";

    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (!el) return;

      const top = el.offsetTop - 150; // adjust for navbar height
      const bottom = top + el.offsetHeight;

      if (window.scrollY >= top && window.scrollY < bottom) {
        current = section;
      }
    });

    if (current) {
      const tabEl = document.querySelector(`[data-tab="${current}"]`);
      if (!tabEl) return;

      const { width } = tabEl.getBoundingClientRect();
      setPosition({
        left: tabEl.offsetLeft,
        width,
        opacity: 1,
      });
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


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
    <Tab name="home" setPosition={setPosition}><a className="no-underline text-amber-50" href='#home'>Home</a></Tab>
    <Tab name="about" setPosition={setPosition}><a className="no-underline text-amber-50" href='#about'>About</a></Tab>
    <Tab name="services" setPosition={setPosition}><a className="no-underline text-amber-50" href='#services'>Services</a></Tab>
    <Tab name="contact" setPosition={setPosition}><a className="no-underline text-amber-50" href='#contact'>Contact</a></Tab>


      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, name, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      data-tab={name}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 px-2 py-1 text-transparent uppercase cursor-pointer"
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





