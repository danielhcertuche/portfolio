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
                        Passionate about <strong>data analysis</strong>, <strong>software development</strong>, and <strong>artificial intelligence</strong>, I work at the crossroads of science and technology, using programming and data visualization to make complex datasets understandable and actionable.
                    </p>
                    <p>
                        Currently, I contribute as a researcher in <strong>Physics and Computational Astrophysics</strong>, exploring data-driven solutions to complex problems. My teaching experience at Cosmo School has honed my ability to approach challenges creatively, blending technical expertise with education to drive meaningful impact.
                    </p>
                    <p>
                    </p>
                </div>

                {/* Columna de imagen */}
                <div className="about-image">
                    <img src={galaxyImage} alt="Galaxy Image" />
                </div>
            </div>
            
            <div className='profile-options'>
                    <a href='DanielCertucheCV.pdf' download='DanielCertuche.pdf'>
                        <button className='btn highlighted-btn'>
                            {" "}Get Resume{" "}
                        </button>
                    </a>
                    <button className='btn primary-btn'>
                        {" "}Hire Me{" "}
                    </button>
                </div>
        </div>
    );
};

export default About;


