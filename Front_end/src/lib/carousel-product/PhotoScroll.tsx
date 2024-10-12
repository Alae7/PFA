import { useEffect, useRef, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const ITEM_WIDTH = 200;
const ITEM_HEIGHT = 200;
const PADDING_X = 10;

const PhotoScroll = ({ imageData, href }) => {

  const navigate = useNavigate();
  const selectedIndex = useRef(-1);

  const el = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const doSelect = (targetIndex: number) => {
    const children = el.current!.children;

    if (selectedIndex.current !== -1) {
      const currentEl = children[selectedIndex.current] as HTMLDivElement;
      currentEl.style.transform = "scale(1)";
      currentEl.style.zIndex = "0";
    }

    const targetEl = children[targetIndex] as HTMLDivElement;
    if (!targetEl) return;
    targetEl.style.transform = "scale(1.75)";
    targetEl.style.zIndex = "999";
    selectedIndex.current = targetIndex;

    const theWidth = ITEM_WIDTH + PADDING_X;
    el.current!.style.transform = `translateX(calc(50% - ${
      theWidth * targetIndex + theWidth * 0.5
    }px))`;
    setCurrentIndex(targetIndex);
  };

  useEffect(() => {
    if (imageData.length > 0) {
        doSelect(0);
    }
}, [imageData]);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < imageData.length) {
      doSelect(nextIndex);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      doSelect(prevIndex);
    }
  };

  useEffect(() => {
    doSelect(0);
  }, []);

  const renderedList = imageData.map((it, index) => (
    <div
      className="absolute transition-all duration-700 top-28 ease-out origin-center rounded-lg bg-no-repeat bg-contain bg-center my-2 cursor-pointer"
      key={index}
      onClick={() => doSelect(index)}
      style={{
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        boxShadow: "2px 10px 20px -6px rgba(0,0,0,0.85)",
        left: (ITEM_WIDTH + PADDING_X) * index,
        backgroundImage: `url(${it})`,
      }}
    >
      <button
        className="absolute bottom-0 w-full bg-green-500 text-white py-1 rounded-b-lg"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/shop/${href[index]}`);
        }}
      >
        See more
      </button>
    </div>
  ));

  return (
    <div className="relative transition-all duration-700 w-full h-full">
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <button
          onClick={handlePrevious}
          className="bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 z-20 mb-20 ml-4"
        >
          <ArrowBackIcon />
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 z-20 mb-20 mr-4"
        >
          <ArrowForwardIcon />
        </button>
      </div>
      <div className="relative transition-all duration-700 w-full h-full" ref={el}>
        {renderedList}
      </div>
    </div>
  );
};

export default PhotoScroll;
