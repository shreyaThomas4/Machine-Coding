import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

const ProgressBar = ({ progress }) => {
    const [animatedProgress, setAnimatedProgress] = useState(0);
    useEffect(() => {
        setTimeout(() => { 
            setAnimatedProgress(progress)
        }, 100);
    }, [progress])
    return (
        <>
            <div className="title">Progress Bar</div>
            <div className="progress-bar-container">
                <div
                    className="progress-bar"
                    style={{ transform: `translateX(${animatedProgress - 100}%)` }}
                    role="progressbar"
                    aria-valuenow={animatedProgress}
                    aria-valuemax="100"
                    aria-valuemin="0"
                >
                    {animatedProgress}%
                </div>
            </div>
        </>
    );
};

export default ProgressBar;
