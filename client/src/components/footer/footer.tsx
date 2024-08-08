// components/footer/Footer.tsx

import React, { useState } from "react";
import './footer.css'; // We will create this CSS file for custom styles
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {

    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState<"option1" | "option2">("option1");

    const handleClick = (option: "option1" | "option2") => {
        setSelectedOption(option);
        if(option === "option1"){
            navigate('/dashboard')
        }else{
            navigate('/prediction_scores')
        }
    };

    return (
        <footer className="footer dark:bg-secondary !important">
            <div className="footer-container">
                <div className={`footer-option ${selectedOption === "option1" ? "selected" : ""}`} onClick={() => handleClick("option1")}>
                    dashboard
                </div>
                <div className={`footer-option ${selectedOption === "option2" ? "selected" : ""}`} onClick={() => handleClick("option2")}>
                    prediction Scores
                </div>
            </div>
        </footer>
    );
};

export default Footer;
