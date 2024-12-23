// About.js
import React from "react";
import "./About.css";
import galaxyImage from '../../assets/Home/galaxy-arms-icon-mod.png';


const About = ({ screenName }) => {
    return (
        <div id={screenName} className="about-container">
            <h2>About Me</h2>
            <div className="underline">
                <div className="circle"></div>
            </div>

            <div className="about-content">
                {/* Columna de texto */}
                <div className="about-text">
                    <p>
                        I’m a scientist-in-training, passionate about **data analysis**, **programming**, 
                        and creating impactful **visualizations**. My work bridges the gap between science 
                        and technology, making complex data accessible and insightful.
                    </p>
                    <p>
                        From exploring the cosmos to designing tools for visualization, I enjoy transforming 
                        raw data into meaningful stories. Curious? <a href="/path-to-your-resume.pdf" download>Download my CV</a>.
                    </p>
                </div>

                {/* Columna de imagen */}
                <div className="about-image">
                    <img src={galaxyImage} alt="Galaxy Image" />
                </div>
            </div>
        </div>
    );
};

export default About;


