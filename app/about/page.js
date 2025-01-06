"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function About() {
  const sectionRef = useRef(null); // Reference to the main section for animation
  const headingRef = useRef(null); // Reference to the title heading
  const contentRef = useRef(null); // Reference to the content for animation

  useEffect(() => {
    document.title = "SocialLoad - About us";


    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;

    // Animate the entire section (fade-in from the bottom)
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );

    // Animate the heading (slide in from left)
    gsap.fromTo(
      heading,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );

    // Animate the content (fade-in from the bottom)
    gsap.fromTo(
      content,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 1, stagger: 0.2, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <section
        ref={sectionRef}
        className="max-w-4xl mx-auto py-12 px-6 md:px-8 space-y-6 bg-white rounded-lg shadow-lg"
      >
        <h1
          ref={headingRef}
          className="text-3xl font-bold text-center text-gray-800"
        >
          About Us
        </h1>

        <div
          ref={contentRef}
          className="space-y-6 text-lg text-gray-600 leading-relaxed"
        >
          <p>
            Welcome to SocialLoad, your go-to solution for downloading videos
            from social media platforms. We believe that everyone should have the
            freedom to access and enjoy their favorite content, whether it's from
            Facebook, Instagram, YouTube, TikTok, or other platforms.
          </p>

          <p>
            Our team has created an intuitive and fast tool to make video downloads
            seamless and effortless. We aim to provide a reliable and secure service
            that puts you in control of your content.
          </p>

          <p>
            We are constantly improving and evolving to meet the needs of our users
            and stay in line with the ever-changing landscape of social media and
            technology.
          </p>

          <h2 className="font-semibold text-xl text-gray-800">Our Mission</h2>
          <p>
            Our mission is to empower individuals to freely access and download
            their favorite media from social platforms while ensuring a simple and
            user-friendly experience. We strive to provide a service that is fast,
            secure, and available for everyone, anytime, anywhere.
          </p>
        </div>
      </section>
    </div>
  );
}
