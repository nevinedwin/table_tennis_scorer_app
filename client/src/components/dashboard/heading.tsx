import React, { memo, useEffect } from "react";
import banner from "../../assets/Banner.png";

const Heading: React.FC = () => {

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const parallax = document.getElementById("parallax");
      if (parallax) {
        parallax.style.backgroundPositionY = `${scrollPosition * 0.5}px`; // Adjust the multiplier to change the effect
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePredictClick = () => {
    const target = document.getElementById("match-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="parallax"
      className="relative w-full overflow-y-auto bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url(${banner})`, backgroundAttachment: 'fixed', backgroundSize: 'cover' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-30"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
        <div className="bg-transparent rounded-lg p-8 w-full max-w-3xl text-center flex items-center justify-center flex-col">
          <h2 className="text-white text-xl lg:text-3xl mb-8 font-bold tracking-wide text-shadow">
            INTER - PROJECT&nbsp;TABLE&nbsp; TENNIS <br />
            DOUBLES&nbsp;TOURNAMENT
          </h2>
          <h1 className="text-4xl lg:text-8xl font-bold mb-4 text-white text-shadow-md lg:text-shadow-xl">
            PING PONG '24
          </h1>
          {/* <div className="lg:w-[500px] flex items-center justify-center">
            <p className="w-full text-center text-white text-sm lg:text-xxl p-2 font-bold tracking-widest uppercase bg-[#3E5362] rounded-xl">
              You can also predict the winner
            </p>
          </div> */}
          <div className="justify-center items-center text-center w-full">
            <button className="mt-12 bg-primary hover:bg-secondary rounded-xl py-2 px-8 font-medium text-md lg:text-xl uppercase "
              onClick={handlePredictClick}
            >
              Predict the winners Now !!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Heading);
