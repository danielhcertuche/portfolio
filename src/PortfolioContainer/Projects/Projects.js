import React from "react";
import "./Projects.css";

const Projects = ({ screenName }) => {
    return (
        <div id={screenName} className="projects-container">
            <h2>Projects</h2>
            <div className="underline">
                <div className="circle"></div>
            </div>

            {/* Thesis Work Section */}
            <div className="project-item">
                <div className="project-header">
                    <span className="project-number">01</span>
                    <h3 className="project-title">Thesis Work: Morphological Characterization of Spiral Arms in Disk Galaxies</h3>
                </div>
                
                <p>
                    My thesis explores the relationship between spiral arm morphology and dark matter halo properties 
                    in disk galaxies simulated with IllustrisTNG. Using advanced techniques, I analyzed gas density, 
                    arm widths, and pitch angles to understand their connections with hosting halo structures.
                </p>

                <p>
                    Findings reveal systematic variations in arm width with distance to the galactic center and correlations 
                    between pitch angles and the central velocity dispersion of subhalos. These results contribute to 
                    understanding the transient nature of spiral arms and their ties to halo evolution.
                </p>
                <p  className="project-description">
                    <a 
                        href="https://jupyterhd.redclara.net/event/45/contributions/511/attachments/203/348/PONENCIA_COCOA_CERTUCHE%20(UdeA).pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                    >
                        View CoCoA Presentation Slides
                    </a>
                </p>
                
            </div>

            {/* Dash Visualization Section */}
            <div className="dash-container">
                <h3 className="dash-title">Galaxy Halo Visualization</h3>
                <iframe
                    src="http://127.0.0.1:8050" // Cambia esta URL por la URL en producción si es necesario
                    title="Galaxy Halo Visualization"
                    className="dash-iframe"
                ></iframe>
            </div>
        </div>
    );
};

export default Projects;


