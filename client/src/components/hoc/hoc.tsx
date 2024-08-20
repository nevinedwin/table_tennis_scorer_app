import React from 'react'
import Navbar from '../navbar/navbar'

// Define the HOC
const Hoc = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
    const WithHoc: React.FC<P> = (props) => {
        return (
            <div className='h-full w-full bg-black text-white text-xl'>
                <div className="h-[90px] border-b-[1px] border-b-borderColor">
                    <Navbar />
                </div>
                <div className='w-full h-full'>
                    <Component {...props} />
                </div>
            </div>
        )
    }
    return WithHoc;
}

export default Hoc;