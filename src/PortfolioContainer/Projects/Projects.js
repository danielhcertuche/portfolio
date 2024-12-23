import React from "react";
import "./Projects.css";
import { ExternalLinkIcon, EyeIcon} from '../../utilities/commonUtils';

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
                    My thesis explores the relationship between spiral arm morphology and dark matter halo properties in disk galaxies simulated with IllustrisTNG. Using advanced techniques, I analyzed gas density, arm widths, and pitch angles to understand their connections with hosting halo structures.
                </p>
                <p>
                    Findings reveal systematic variations in arm width with distance to the galactic center and correlations between pitch angles and the central velocity dispersion of subhalos. These results contribute to understanding the transient nature of spiral arms and their ties to halo evolution.
                </p>
            </div>

            {/* Project Cards Section */}
            <div className="projects-cards">
                {/* Tarjeta 1: CoCoA Presentation */}
                <div className="project-card">
                    <div className="project-header-card">
                        <h3 className="project-title-card">CoCoA Presentation</h3>
                    </div>
                    <p className="project-description">
                        Explore the slides for more details.
                    </p>
                    
                        <a
                            href="https://jupyterhd.redclara.net/event/45/contributions/511/attachments/203/348/PONENCIA_COCOA_CERTUCHE%20(UdeA).pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                        >
                            <button className='btn primary-btn'> 
                                <ExternalLinkIcon />                   
                            </button>
                        </a>
                </div>

                {/* Tarjeta 2: Galaxy Halo Visualization */}
                <div className="project-card project-card-large">
                    <div className="project-header-card">
                        <h3 className="project-title">Galaxy Halo Visualization</h3>
                    </div>
                    <p className="project-description">
                        An interactive Dash-based visualization tool to explore the properties of galaxy halos. Dive into the visualization below.
                    </p>
                    <iframe
                        src="https://dash-app-ce28.onrender.com/"
                        title="Galaxy Halo Visualization"
                        className="dash-iframe"
                    ></iframe>

                    <div className="project-href-a">
                        <a 
                        href="https://dash-app-ce28.onrender.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                            >
                            <button className='btn primary-btn'>
                            <EyeIcon />
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;



