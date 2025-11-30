/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { color, motion, useMotionValue, useTransform } from "framer-motion";
import { img1,img10,img2,img3,img4,img5,img6,img7, img9} from '../assets'
import '../../index.css'

const SwipeCards = () => {
  const [cards, setCards] = useState(cardData);

  return (
    <div className="cards-container">
    <div
     className="
    grid place-items-center 
    w-[90%] md:w-[70%] lg:w-[70%]
    h-[65vh] md:h-[70vh]
    mx-auto mt-10 mb-5
    bg-black
    rounded-md
  "
  style={{ backgroundColor: "#dab4c0" }}
>
  
      {cards.map((card) => {
        return (
          <Card key={card.id} cards={cards} setCards={setCards} {...card} />
        );
      })}
    </div>
    </div>
  );
};

const Card = ({ id, url, setCards, cards }) => {
  const x = useMotionValue(0);
  

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const isFront = cards[cards.length - 1]?.id === id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;

    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((pv) => pv.filter((v) => v.id !== id));
    }
  };

  return (
    <motion.img
      src={url}
      alt="Placeholder alt"
      className="
  w-[75%] sm:w-[60%] md:w-[55%] lg:w-[40%]
  max-h-[60%]
  origin-bottom rounded-lg object-cover
  hover:cursor-grab active:cursor-grabbing
"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{
        left: -300,
        right: 300,
      }}
      onDragEnd={handleDragEnd}
    />
  );
};

export default SwipeCards;

const cardData = [
  {
    id: 1,
    url:img1
  },
  {
    id: 2,
    url: img2
  },
  {
    id: 3,
    url: img3
  },
  {
    id: 4,
   url: img4
   },
  {
    id: 5,
    url: img5
   },
  {
    id: 6,
  url: img6
 },
  {
    id: 7,
    url: img7
   },
  {
    id: 8,
    url: img1
   },
   {
    id: 9,
    url: img9
   },
   {
    id: 10,
    url: img10
   },
];