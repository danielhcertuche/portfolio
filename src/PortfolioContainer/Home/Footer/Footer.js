import React from 'react';
import bg from '../../../assets/Home/shape-bg.png';
import './Footer.css'

export default function Footer(){
    return(
        <div className='footer-container'>
            <div className='footer-parent'>
                <img src={bg} alt='img not'/>
            </div>
        </div>
    )
}