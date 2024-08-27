import React, { memo } from 'react'

const Heading: React.FC = () => {
    return (
        <div className='w-full pt-20 mb-20 h-[200px]'>
            <div className=" inset-0 flex justify-center items-center px-4">
                <div className="bg-transparent rounded-lg p-8 w-full ">
                    <h1 className="lg:text-5xl text-4xl font-bold mb-4 text-center animate-bounce text-white">
                        PING PONG '<sup>24</sup>
                    </h1>
                    <h4 className='text-white text-center text-xl lg:text-3xl '>
                        Inter&mdash;Project Table Tennis Doubles Tournament
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default memo(Heading)