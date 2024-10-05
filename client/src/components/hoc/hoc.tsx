import React from 'react'
import Navbar from '../navbar/navbar'

// Define the HOC
const Hoc = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
    const WithHoc: React.FC<P> = (props) => {
        return (
            <div className='h-full w-full bg-bgColor text-white text-xl'>
                <div className="h-[90px] bg-navbarBg fixed top-0 left-0 right-0" style={{zIndex: 1000}}>
                    <Navbar />
                </div>
                <div className='w-full pt-[90px]' style={{height: '100vh'}}>
                    <Component {...props} />
                </div>
            </div>
        )
    }
    return WithHoc;
}

export default Hoc;