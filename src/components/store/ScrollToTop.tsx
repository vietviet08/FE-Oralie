"use client";
import React, { useState, useEffect } from "react";
import { Icons } from "../icons";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const checkScrollPosition = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={handleScrollToTop}
          className="fixed flex justify-center items-center size-10 bottom-6 right-6 p-3 bg-primaryred1 text-white rounded-full shadow-lg hover:bg-red-600 transition-all z-50"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "all 0.5s ease-in-out",
          }}
        >
          <Icons.chevronUp width={24} size={38} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
