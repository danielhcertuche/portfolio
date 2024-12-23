import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = (event, id) => {
        event.preventDefault();
        const element = document.getElementById(id);
        const offset = 88; // Altura del menú fijo
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const scrollPosition = elementRect - bodyRect - offset;

        window.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
        });
        setIsMenuOpen(false); // Cierra el menú al hacer clic en un enlace
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">Certuche-Grueso</div>
            <div className="menu-toggle" onClick={toggleMenu}>
                ☰
            </div>
            <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                <li>
                    <a href="#home" onClick={(e) => handleScroll(e, "home")}>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#about" onClick={(e) => handleScroll(e, "about")}>
                        About
                    </a>
                </li>
                <li>
                    <a href="#projects" onClick={(e) => handleScroll(e, "projects")}>
                        Projects
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

