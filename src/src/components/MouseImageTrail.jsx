/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { FiMousePointer } from "react-icons/fi";
import {
  img1, img10, img11, img12, img13, img14, img15,
  img16, img17, img18, img2, img3, img4, img5,
  img6, img7, img8
} from '../assets';


export const Example = () => {
  return (
    <MouseImageTrail
      images={[
        img1, img2, img3, img4, img5, img6, img8,
        img10, img11, img12, img13, img14, img15,
        img16, img17, img18
      ]}
    >
      <section className="grid h-screen w-full place-content-center bg-transparent">
      </section>
    </MouseImageTrail>
  );
};

const MouseImageTrail = ({ children, images }) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [breathingScale, setBreathingScale] = useState(1);
  const [breathingY, setBreathingY] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);
  const popupTimerRef = useRef(null);

  const centerImages = [...new Set(images)].slice(0, 8);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);

        if (entry.isIntersecting && !hasInteracted) {
          popupTimerRef.current = setTimeout(() => {
            setShowPopup(true);
          }, 1000);
        } else {
          setShowPopup(false);
          if (popupTimerRef.current) {
            clearTimeout(popupTimerRef.current);
          }
        }
      },
      { threshold: 0.3, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [hasInteracted]);

  useEffect(() => {
    if (hasInteracted || !isInView) return;

    let animationFrameId;
    let startTime = null;

    const animateBreathing = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const cycle = (elapsed % 3000) / 3000;
      const scale = 1 + Math.sin(cycle * Math.PI * 2) * 0.03;
      const offsetY = Math.sin(cycle * Math.PI * 2) * -3;

      setBreathingScale(scale);
      setBreathingY(offsetY);

      animationFrameId = requestAnimationFrame(animateBreathing);
    };

    animationFrameId = requestAnimationFrame(animateBreathing);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasInteracted, isInView]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isInView) return;

    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setShowPopup(false);
      }
    };

    container.addEventListener("mousemove", handleInteraction);
    container.addEventListener("touchmove", handleInteraction);
    container.addEventListener("click", handleInteraction);

    return () => {
      container.removeEventListener("mousemove", handleInteraction);
      container.removeEventListener("touchmove", handleInteraction);
      container.removeEventListener("click", handleInteraction);
    };
  }, [hasInteracted, isInView]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {children}

      {!hasInteracted && showPopup && isInView && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="bg-black/90 text-white px-6 py-3 rounded-full backdrop-blur-sm flex items-center gap-3 shadow-xl border border-white/10">
            <FiMousePointer className="animate-bounce text-lg" />
            <span className="text-sm font-medium">Move cursor to interact with cards</span>
          </div>
        </motion.div>
      )}

      {!hasInteracted && isInView && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {centerImages.map((img, index) => {
            const total = centerImages.length;
            const angle = (index / total) * Math.PI * 2;
            const radius = 200;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const rotation = index % 2 === 0 ? 12 : -12;

            return (
              <motion.div
                key={index}
                className="absolute overflow-hidden shadow-2xl"
                style={{
                  width: "280px",
                  height: "280px",
                  borderRadius: "12px",
                  border: "2px solid rgba(255, 255, 255, 0.4)",
                  background: "black",
                  flexShrink: 0,
                }}
                initial={{ opacity: 0, scale: 0.5, rotate: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0.9,
                  scale: breathingScale,
                  x: x,
                  y: y + breathingY,
                  rotate: rotation,
                }}
                transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 100, damping: 12 }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={img}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectFit: "cover", objectPosition: "center", flexShrink: 0 }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {hasInteracted && <MouseTrailEffect images={images} />}
    </div>
  );
};

const MouseTrailEffect = ({ images }) => {
  const [trailImages, setTrailImages] = useState([]);
  const lastPosition = useRef({ x: 0, y: 0 });
  const imageCount = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      const distance = Math.sqrt(
        Math.pow(clientX - lastPosition.current.x, 2) +
        Math.pow(clientY - lastPosition.current.y, 2)
      );

      if (distance > 50) {
        lastPosition.current = { x: clientX, y: clientY };

        const newImage = {
          id: imageCount.current++,
          x: clientX,
          y: clientY,
          img: images[imageCount.current % images.length],
          rotation: Math.random() * 25 - 12.5,
          width: 160,   
          height: 220,  
        };

        setTrailImages(prev => [...prev.slice(-15), newImage]);

        setTimeout(() => {
          setTrailImages(prev => prev.filter(img => img.id !== newImage.id));
        }, 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [images]);

  return (
    <div ref={containerRef} className="pointer-events-none">
      {trailImages.map((trail) => (
        <motion.div
          key={trail.id}
          className="absolute overflow-hidden shadow-xl pointer-events-none"
          style={{
            left: trail.x,
            top: trail.y,
            width: `${trail.width}px`,
            height: `${trail.height}px`,
            borderRadius: "10px",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            background: "black",
            transform: `translate(-50%, -50%) rotate(${trail.rotation}deg)`,
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.7, 1, 0.8] }}
          transition={{ duration: 1.2, times: [0, 0.1, 1] }}
        >
          <div className="relative w-full h-full">
            <img
              src={trail.img}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
