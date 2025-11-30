import React,{useState} from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./Menu.css";
import { FaWaveSquare } from "react-icons/fa";

export default function WaveMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const onClose = () => setIsMenuOpen(false);
  return (
    <AnimatePresence>
      
        <div className="menu-icon-container">
         <FaWaveSquare size={28} className="menu-icon" onClick={toggleMenu} />
        </div>

      {isMenuOpen && (
        <motion.div
          className="wave-menu"
          initial={{ clipPath: "circle(0% at 100% 50%)" }}
          animate={{ clipPath: "circle(150% at 100% 50%)" }}
          exit={{ clipPath: "circle(0% at 100% 50%)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.ul
            className="wave-links"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
            }}
          >
            {["Home", "Services","about", "Contact"].map(
              (text, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <a  className="no-underline" href={`#${text.toLowerCase().replace(" ", "-")}`} onClick={onClose}>
                    {text}
                  </a>
                </motion.li>
              )
            )}
          </motion.ul>

          {/* Overlay to close menu */}
          <div className="wave-overlay" onClick={onClose}></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
