/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  img1,
  img10,
  img11,
  img12,
  img13,
  img15,
  img16,
  img17,
  img18,
  img2,

} from "../assets";
import "../../index.css";

const SwipeCards = () => {
  const [cards, setCards] = useState(cardData);


  const frontCard = cards.length > 0 ? cards[cards.length - 1] : null;

  const backgroundCards = cards.slice(0, -1);

  return (
    <>
      <div className="w-full flex justify-center mt-10 mb-5">
        <div className="cards-container w-[90%] md:w-[70%] lg:w-[60%] h-[70vh] relative overflow-hidden flex items-center justify-center">
    
          {cards.length === 0 && (
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold mb-2">
                All cards swiped!
              </h3>
              <p className="text-gray-300">Reset to start again</p>
            </motion.div>
          )}

    
          {backgroundCards.map((card, index) => (
            <NonFrontCard 
              key={card.id} 
              {...card} 
              index={index}
              totalCards={cards.length}
              isNextToFront={index === backgroundCards.length - 1}
            />
          ))}
          
       
          {frontCard && (
            <FrontCard 
              key={frontCard.id}
              {...frontCard}
              setCards={setCards}
              cards={cards}
            />
          )}
        </div>
      </div>

   
      <div className="w-full flex justify-center mb-10">
        <motion.button
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          whileHover={{ 
            boxShadow: "0 10px 30px rgba(0, 200, 255, 0.4), 0 5px 15px rgba(150, 0, 255, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCards(cardData)}
        >
          Reset Cards
        </motion.button>
      </div>
    </>
  );
};


const NonFrontCard = ({ id, url, index, totalCards, isNextToFront }) => {
  const offset = id % 2 ? 6 : -6;
  
  return (
    <motion.img
      src={url}
      alt="Card"
      className="
        absolute
        w-[75%] sm:w-[60%] md:w-[55%] lg:w-[40%]
        max-h-[65%]
        rounded-lg object-cover origin-bottom
        pointer-events-none
      "
      initial={{ 
        scale: 0.98,
        rotate: `${offset}deg`,
        y: (totalCards - index - 1) * -3 
      }}
      animate={{
        scale: isNextToFront ? 0.99 : 0.98,
        rotate: `${offset}deg`,
        y: (totalCards - index - 1) * -3,
        boxShadow: isNextToFront 
          ? "0 10px 15px -3px rgba(0,0,0,.3), 0 4px 6px -4px rgba(0,0,0,.3)"
          : "0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px -1px rgba(0,0,0,.1)"
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3
      }}
      style={{
        zIndex: index + 1,
      }}
    />
  );
};


const FrontCard = ({ id, url, setCards, cards }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(() => `${rotateRaw.get()}deg`);

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    
    if (Math.abs(info.offset.x) > threshold) {

      const direction = info.offset.x > 0 ? 1 : -1;
      

      const exitX = direction * 500;
      const exitRotate = direction * 25;
      

      x.set(exitX, {
        type: "spring",
        stiffness: 400,
        damping: 30
      });
      
 
      setTimeout(() => {
        setCards((pv) => pv.filter((v) => v.id !== id));
      }, 300);
    } else {
   
      x.set(0, {
        type: "spring",
        stiffness: 300,
        damping: 20
      });
      y.set(0, {
        type: "spring",
        stiffness: 300,
        damping: 20
      });
    }
  };

  return (
    <motion.img
      src={url}
      alt="Card"
      className="
        absolute
        w-[75%] sm:w-[60%] md:w-[55%] lg:w-[40%]
        max-h-[65%]
        rounded-lg object-cover origin-bottom
        hover:cursor-grab active:cursor-grabbing
      "
      initial={{ 
        scale: 1,
        y: 0,
        opacity: 1 
      }}
      style={{
        x,
        y,
        rotate,
        opacity,
        boxShadow: "0 20px 25px -5px rgba(0,0,0,.5), 0 8px 10px -6px rgba(0,0,0,.5)",
        zIndex: cards.length + 10, 
      }}
      animate={{
        scale: 1,
      }}
      exit={{ 
        x: 500, 
        opacity: 0,
        transition: { duration: 0.3 }
      }}
      drag="x"
      dragConstraints={{ left: -150, right: 150 }}
      dragElastic={0.6}
      dragTransition={{ 
        bounceStiffness: 500, 
        bounceDamping: 30,
      }}
      onDragEnd={handleDragEnd}
    
      onDragStart={() => {
        y.set(-10, {
          type: "spring",
          stiffness: 400,
          damping: 25
        });
      }}
    />
  );
};

export default SwipeCards;

const cardData = [
  { id: 1, url: img17 },
  { id: 2, url: img2 },
  { id: 3, url: img16 },
  { id: 4, url: img18 },
  { id: 5, url: img15 },
  { id: 6, url: img13 },
  { id: 7, url: img11 },
  { id: 8, url: img1 },
  { id: 9, url: img12 },
  { id: 10, url: img10 }
];