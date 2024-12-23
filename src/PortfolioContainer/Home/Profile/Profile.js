import React from 'react';
import Typical from 'react-typical';
import './Profile.css';

export default function Profile(){
    return(
        <div className = 'profile-container'>
            <div className='profile-parent'>
                <div className='profile-datails'>
                    <div className='colz'>
                        <div className='colz-icon'>
                            
                            <a href='https://github.com/danielhcertuche'>
                                <i className='fa fa-github'></i>
                            </a>
                            <a href='https://www.linkedin.com/in/daniel-certuche-grueso-71993a77/'>
                                <i className='fa fa-linkedin'></i>
                            </a>
                            <a href='https://www.instagram.com'>
                                <i className='fa fa-instagram'></i>
                            </a>
                            <a href='https://twitter.com'>
                                <i className='fa fa-twitter'></i>
                            </a>
                            
                        </div>
                    </div>
                </div>
                <div className='profile-details-name'>
                    <span className='primary-text'>
                        {" "}
                        Hello, I'm <span className='highlighted-text'>Daniel </span> 
                    </span>
                </div>
                <div className='profile-details-role'>
                    <span className='primary-text'>
                        {" "}
                        <h1>
                            {" "}
                            <Typical loop={Infinity}
                                steps ={[
                                    "Enthusiastic Scientist 🔭🚀📡...",
                                     1800,
                                     "Quasi-developer ☄️...",
                                     1800,
                                     "Python...",
                                     1800,
                                     "Java...",
                                     1800,
                                     "React...",
                                     1800
                                    ]}>
                            </Typical>
                        </h1>
                        <span className='profile-role-tagline'>
                            I'm always looking for add value on my role so I keep learning and unlearnig to improve my skills
                        </span>
                    </span>
                </div>
            </div>
            <div className="profile-picture">
                    <div className='profile-picture-background'>

                    </div>
            </div>
        </div>
    )
}