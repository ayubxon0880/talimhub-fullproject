import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import Quotes from "../Quotes/Quotes";
import Banner from "../Banner/Banner";
import Banner2 from "../Banner/Banner";
import Features from "../Features/Features";
import Footer from "../Footer/Footer";
import PopupPlayer from "../PopupPlayer/PopupPlayer";

import AOS from "aos";
import "aos/dist/aos.css";

const Animate = () => {
  const [isPlay, setIsPlay] = useState(false);

  const togglePlay = () => {
    setIsPlay(!isPlay);
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <main className="overflow-x-hidden bg-white dark:bg-black text-black dark:text-white duration-300">
      <Navbar />
      <Hero togglePlay={togglePlay} />
      <Quotes />
      <Banner togglePlay={togglePlay} />
      <Banner2 togglePlay={togglePlay} />
      <Features />
      <Footer />

      {/* Video Player */}
      <PopupPlayer isPlay={isPlay} togglePlay={togglePlay} />
    </main>
  );
};

export default Animate;
