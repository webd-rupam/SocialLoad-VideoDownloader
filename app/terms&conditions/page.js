"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Terms() {
  const sectionRef = useRef(null); // Reference to the main section for animation
  const headingRef = useRef(null); // Reference to the title heading
  const contentRef = useRef(null); // Reference to the content for animation

  useEffect(() => {

    document.title = "SocialLoad - Terms & Conditions";

    // GSAP animations
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

    // Animate the content (fade-in from the bottom with staggered timing)
    gsap.fromTo(
      content,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 1, stagger: 0.2, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <section
        ref={sectionRef}
        className="max-w-4xl mx-auto py-12 px-6 md:px-8 space-y-6 bg-white rounded-lg shadow-lg"
      >
        <h1
          ref={headingRef}
          className="text-3xl font-bold text-center text-gray-800"
        >
          Terms and Conditions
        </h1>

        <div
          ref={contentRef}
          className="space-y-6 text-lg text-gray-600 leading-relaxed"
        >
          <p>
            Welcome to SocialLoad, a platform that allows users to download
            videos from various social media platforms. By using our services, you
            agree to comply with the following terms and conditions.
          </p>

          <h2 className="font-semibold text-xl text-gray-800">1. User Responsibility</h2>
          <p>
            You are responsible for ensuring that your use of our service is in
            accordance with all applicable laws, including copyright and intellectual
            property rights. You should not download videos from platforms that prohibit
            such actions.
          </p>

          <h2 className="font-semibold text-xl text-gray-800">2. Content Ownership</h2>
          <p>
            SocialLoad does not claim ownership of any video content. All content
            belongs to its respective owners and copyright holders. Our service is only
            intended for personal and non-commercial use.
          </p>

          <h2 className="font-semibold text-xl text-gray-800">3. Privacy Policy</h2>
          <p>
           We do not store your personal data, so feel free to use our platform.
          </p>

          <h2 className="font-semibold text-xl text-gray-800">4. Limitation of Liability</h2>
          <p>
            We are not responsible for any damages or losses arising from the use of
            our service. You agree to use our platform at your own risk.
          </p>

          <h2 className="font-semibold text-xl text-gray-800">5. Modifications</h2>
          <p>
            SocialLoad reserves the right to modify these terms and conditions at
            any time. Changes will be reflected on this page, and we encourage you to
            review them periodically.
          </p>

          <p className="text-center text-gray-500">
            Last Updated: 02/01/2025
          </p>
        </div>
      </section>
    </div>
  );
}
