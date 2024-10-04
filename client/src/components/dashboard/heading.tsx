import React, { memo } from "react";
import banner from "../../assets/Banner.png";
import { useNavigate } from "react-router-dom";

const Heading: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
        <div className="bg-transparent rounded-lg p-8 w-full max-w-3xl text-center">
          <h2 className="text-white text-xl lg:text-3xl mb-8 font-bold tracking-wide">
            INTER&mdash;PROJECT&nbsp;TABLE&nbsp; TENNIS <br />
            DOUBLES&nbsp;TOURNAMENT
          </h2>
          <h1 className="text-4xl lg:text-8xl font-bold mb-4 text-white">
            PING PONG '24
          </h1>

          <div className="justify-center items-center text-center w-full">
            <button className="mt-12 bg-blue-400 rounded-3xl p-2 font-medium w-48 border-4 border-[#1E4573]"
            onClick={()=>{
              navigate('/matches')
            }}
            >
              View Matches
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Heading);
