/* eslint-disable no-unused-vars */
import { transformValue, useAnimate } from "framer-motion";
import React, { useRef } from "react";
import { FiMousePointer } from "react-icons/fi";
import { img1,img10,img11,img12,img13,img14,img15,img16,img17,img18,img2,img3,img4,img5,img6,img7, img8 } from '../assets'

export const Example = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img8,
        img10,
        img11,
        img12,
        img13,
        img13,
        img14,
        img15,
        img16,
        img17,
        img18
      ]}
    >
      <section className="grid h-screen w-full place-content-center bg-transparent">
        <p className="flex items-center gap-2 text-3xl font-bold uppercase text-black">
          <FiMousePointer />
          <span>Hover me to see some of our cards</span>
        </p>
      </section>
    </MouseImageTrail>
  );
};

const MouseImageTrail = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);


  const handleTouchMove = (e) => {
    const t = e.touches[0];
    handleMouseMove({ clientX: t.clientX, clientY: t.clientY });
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    userIsActive.current = true
    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage(clientX, clientY);
    }
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  const renderNextImage = (x, y) => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector);

    el.style.top = `${y}px`;
    el.style.left = `${x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: 1,
        transform: `translate(-50%, -50%) scale(1) rotate(${
          imageIndex % 2 ? rotation : -rotation
        }deg)`
      },
      { type: "spring", damping: 20, stiffness: 150 }
    );


    imageRenderCount.current += 1;
  };


const userIsActive = useRef(false);         
const randomlastRenderPosition = useRef({ x: 100, y: 100 }); 
const maxImages = images.index+1



const startAutoMotion = () => {
  let step = 0;

  const runStep = () => {
  if (!userIsActive.current) { 
    if (step >= maxImages) return; 

    simulateSequentialMotion();
    step++;

    setTimeout(runStep, 300); 
  };

  runStep();}
  
   
};


const simulateSequentialMotion = () => {
  if (userIsActive.current) return;   
  const nextX = randomlastRenderPosition.current.x + 40;
  const nextY = randomlastRenderPosition.current.y + 10;
  renderNextImage(nextX, nextY);
  randomlastRenderPosition.current = { x: nextX, y: nextY };
};

React.useEffect(()=>{
  startAutoMotion()
})


  return (
    <div
      ref={scope}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative overflow-hidden"
    >
      {children}

      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          data-mouse-move-index={index}
          alt=""
          className="
            pointer-events-none absolute left-0 top-0
            h-[30%] w-auto rounded-xl 
            max-md:h-[15%]
            border-2 border-black 
            opacity-0
            object-cover
          "
        />
      ))}
    </div>
  );
};
