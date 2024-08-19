import React from "react";
import Navbar from "../../components/navbar/navbar";

export type NavigationType = 'details' | 'prediction';

const Dashboard: React.FC = () => {

    return (
        <div className="h-full w-full">
            <div className="h-[90px] border-b-[1px] border-b-borderColor">
                <Navbar />
            </div>
            <div className="text-white">NEvin Ediwn</div>
        </div>
    )
};

export default Dashboard;
