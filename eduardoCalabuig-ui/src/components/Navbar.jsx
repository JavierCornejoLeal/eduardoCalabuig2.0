import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { PiX } from "react-icons/pi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import api from "../utils/api";

import "../assets/styles/Navbar.css";
import logoMarron from "../assets/images/logo/logo.webp";
import logoNegro from "../assets/images/logo/logoNegro.webp";


const NavBar = ({ alwaysLight = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showCartPanel, setShowCartPanel] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(window.innerHeight * 0.08);

  const location = useLocation();
  const currentPath = location.pathname + location.hash;
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const headerHeight = window.innerHeight * 0.8;
      setScrolled(window.scrollY > headerHeight);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setNavbarHeight(window.innerHeight * 0.08);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isLight = alwaysLight || scrolled || expanded || showCartPanel;

  const links = [
    { text: "SOBRE MÍ", to: "/#aboutMe", isHash: true },
    { text: "PROYECTOS", to: "/proyectos" },
    { text: "NOTICIAS", to: "/noticias" },
    { text: "CONTACTO", to: "/contacto" },
  ];

  return (
    <>
      <Navbar
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        expand="lg"
        variant={isLight ? "light" : "dark"}
        style={{
          backgroundColor: isLight ? "rgba(255,255,255,0.8)" : "transparent",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: isLight ? "0 4px 6px rgba(0,0,0,0.1)" : "none",
          position: "fixed",
          width: "100%",
          zIndex: 2000,
          transition: "all 0.3s ease",
        }}
      >
        <Container fluid className="px-md-5 mx-md-5">
          <Navbar.Brand href="/">
            <img
              src={isLight ? logoNegro : logoMarron}
              alt="Eduardo Calabuig"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            {expanded ? <PiX size={30} /> : <HiBars3BottomRight size={30} />}
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="ms-auto align-items-center gap-5"
              style={{ color: isLight ? "black" : "white" }}
            >
              {links.map(({ text, to, isHash }, idx) => {
                const isActive = isHash
                  ? currentPath.startsWith(to)
                  : currentPath === to;

                const linkClass = isActive
                  ? isLight
                    ? "navbar-hover-black active"
                    : "navbar-hover-white active"
                  : isLight
                  ? "navbar-hover-black"
                  : "navbar-hover-white";

                return isHash ? (
                  <Nav.Link
                    key={idx}
                    as={HashLink}
                    to={to}
                    smooth
                    className={linkClass}
                    style={{ color: isLight ? "black" : "white" }}
                    onClick={() => setExpanded(false)}
                  >
                    {text}
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    key={idx}
                    href={to}
                    className={linkClass}
                    style={{ color: isLight ? "black" : "white" }}
                    onClick={() => setExpanded(false)}
                  >
                    {text}
                  </Nav.Link>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showCartPanel && (
        <CartPanel
          onClose={() => setShowCartPanel(false)}
          totalPrice={totalCartItems}
          navbarHeight={navbarHeight}
        />
      )}
    </>
  );
};

export default NavBar;
