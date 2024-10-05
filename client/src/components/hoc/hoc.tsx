import React from 'react'
import Navbar from '../navbar/navbar'

// Define the HOC
const Hoc = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
    const WithHoc: React.FC<P> = (props) => {
        return (
            <div className='h-full w-full bg-bgColor text-white text-xl'>
                <div className="h-[90px] bg-navbarBg">
                    <Navbar />
                </div>
                <div className='w-full' style={{height: 'calc(100vh - 90px)'}}>
                    <Component {...props} />
                </div>
            </div>
        )
    }
    return WithHoc;
}

export default Hoc;