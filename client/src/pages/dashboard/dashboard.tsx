import React from "react";
import Hoc from "../../components/hoc/hoc";

export type NavigationType = 'details' | 'prediction';

const Dashboard: React.FC = () => {

    return (
        <div className="h-full w-full">
            <div className="text-white">NEvin Ediwn</div>
        </div>
    )
};

export default Hoc(Dashboard);
