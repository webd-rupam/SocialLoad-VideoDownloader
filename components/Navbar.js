"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Create a ref to store the links for the animation
  const linksRef = useRef([]);

  // Toggle menu state on mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add animation on mount
  useEffect(() => {
    // Ensure that the links are available before animating them
    if (linksRef.current.length > 0) {
      gsap.from(linksRef.current, {
        y: -20,
        opacity: 0,
        stagger: 0.3,
        duration: 2,
        ease: "power3.out",
      });
    }
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="p-4 flex justify-between items-center text-white md:px-16 px-5 bg-black bg-opacity-15 backdrop-blur-3xl rounded-lg shadow-lg sticky top-0 z-50">
        <Link href={"/"} className="flex gap-2">
<Image src={"/logo.png"} width={20} height={10} alt="logo"></Image>
        <div className="md:text-lg text-sm font-bold">SocailLoad</div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex text-sm space-x-6 text-white">
          <Link
            href={"/"}
            ref={(el) => (linksRef.current[0] = el)}
            className="nav-link hover:text-purple-500"
          >
            Home
          </Link>
          <Link
            href={"/contact"}
            ref={(el) => (linksRef.current[1] = el)}
            className="nav-link hover:text-purple-500"
          >
            Contact
          </Link>
          <Link
            href={"/about"}
            ref={(el) => (linksRef.current[2] = el)}
            className="nav-link hover:text-purple-500"
          >
            About us
          </Link>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden flex items-center space-x-2"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            // Show X when menu is open
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Show hamburger when menu is closed
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden z-40 bg-white bg-opacity-15 backdrop-blur-3xl shadow-lg transition-all duration-300 ease-in-out sticky top-14 left-0 right-0 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col items-center space-y-4 py-4">
          <Link
            href={"/"}
            ref={(el) => (linksRef.current[3] = el)}
            className="nav-link hover:text-purple-500"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href={"/contact"}
            ref={(el) => (linksRef.current[4] = el)}
            className="nav-link hover:text-purple-500"
            onClick={closeMenu}
          >
            Contact
          </Link>
          <Link
            href={"/about"}
            ref={(el) => (linksRef.current[5] = el)}
            className="nav-link hover:text-purple-500"
            onClick={closeMenu}
          >
            About us
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
