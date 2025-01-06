"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaTiktok, FaWhatsapp, FaSoundcloud, FaVimeo, FaLinkedin, FaGlobe, FaArrowRight, FaSnapchat } from 'react-icons/fa';
import gsap from 'gsap';
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  const iconsRef = useRef(null); // Reference for social media icons container
  const iconRef = useRef(null); // Reference for social media icons container for the other section
  const [videoUrl, setVideoUrl] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [platform, setPlatform] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Track error message
  const [downloadLink, setDownloadLink] = useState(""); // Store backend download link
  const [isLoading, setIsLoading] = useState(false); // Loading state for API requests

  useEffect(() => {
    document.title = "SocialLoad - Download Videos from across the web";

    // GSAP animation to animate the icons from left to right
    const icons = iconsRef.current;
    if (icons) {
      gsap.fromTo(
        icons,
        { x: "100%" },
        { x: "-100%", duration: 10, repeat: -1, ease: "linear" } // Animate to the left, repeat infinitely
      );
    }
  }, []);

  useEffect(() => {
    // GSAP animation to animate the icons from right to left
    const icon = iconRef.current;
    if (icon) {
      gsap.fromTo(
        icon,
        { x: "-100%" },
        { x: "100%", duration: 10, repeat: -1, ease: "linear" } // Animate to the right, repeat infinitely
      );
    }
  }, []);

  // Function to detect platform based on URL
  const detectPlatform = (url) => {
    if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
    if (/instagram\.com/.test(url)) return "instagram";
    if (/facebook\.com/.test(url)) return "facebook";
    if (/tiktok\.com/.test(url)) return "tiktok";
    if (/vimeo\.com/.test(url)) return "vimeo";
    if (/dailymotion\.com/.test(url)) return "dailymotion"; // Added Dailymotion support
    if (/twitch\.tv/.test(url)) return "twitch"; // Added Twitch support
    if (/x\.com/.test(url)) return "x"; // Added Twitter support
    if (/linkedin\.com/.test(url)) return "linkedin"; // Added LinkedIn support
    if (/soundcloud\.com/.test(url)) return "soundcloud"; // Added SoundCloud support
    if (/mix\.com/.test(url)) return "mix"; // Added Mix (formerly StumbleUpon) support
    if (/periscope\.tv/.test(url)) return "periscope"; // Added Periscope support
    if (/vkontakte\.ru/.test(url)) return "vkontakte"; // Added VK (VKontakte) support
    if (/weibo\.com/.test(url)) return "weibo"; // Added Weibo support
    if (/snapchat\.com/.test(url)) return "snapchat"; // Added Snapchat support
    if (/pinterest\.com/.test(url)) return "pinterest"; // Added Pinterest support
    return "unknown";
  };
  

  // Function to validate the URL (check if it's a known platform)
  const validateUrl = (url) => {
    const platform = detectPlatform(url);
    return platform !== "unknown";
  };

  // Handle start button click (validation and backend request)
  const handleStartClick = async () => {
    if (validateUrl(videoUrl)) {
      setIsValidUrl(true);
      const platform = detectPlatform(videoUrl);
      setPlatform(platform);
      setVideoSrc(videoUrl);
      setErrorMessage(""); // Reset error message if valid URL

      try {
        setIsLoading(true); // Start loading animation
        const response = await fetch("/api/download", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ videoUrl }),
        });

        const data = await response.json();

        if (data.downloadLink) {
          setDownloadLink(data.downloadLink); // Set the download link
        } else {
          setErrorMessage("Unable to fetch the video. Please try again.");
        }
      } catch (error) {
        setErrorMessage("An error occurred while processing your request.");
      } finally {
        setIsLoading(false); // Stop loading animation
      }
    } else {
      setIsValidUrl(false);
      setErrorMessage("Please enter a valid video URL.");
    }
  };

  // Function to get the embed URL for previewing videos
  const getVideoEmbedUrl = (platform, url) => {
    switch (platform) {
      case "youtube":
        const youtubeId = url.split("v=")[1]?.split("&")[0];
        return `https://www.youtube.com/embed/${youtubeId}`;
      case "vimeo":
        const vimeoId = url.split("vimeo.com/")[1];
        return `https://player.vimeo.com/video/${vimeoId}`;
      case "tiktok":
        const tiktokId = url.split("tiktok.com/")[1]?.split("/")[0];
        return `https://www.tiktok.com/embed/${tiktokId}`;
      case "facebook":
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`;
      case "instagram":
        return url; // Instagram doesn't support embedding via iframe easily
      case "dailymotion":
        const dailymotionId = url.split("dailymotion.com/video/")[1];
        return `https://www.dailymotion.com/embed/video/${dailymotionId}`;
      case "twitch":
        const twitchId = url.split("twitch.tv/")[1];
        return `https://player.twitch.tv/?video=${twitchId}&autoplay=false`;
        case "x":
          const xId = url.split("status/")[1];
          return `https://x.com/${xId}`;
      case "linkedin":
        return url; // LinkedIn doesn't allow embedding directly
      case "soundcloud":
        const soundcloudId = url.split("soundcloud.com/")[1];
        return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundcloudId}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false`;
      case "mix":
        const mixId = url.split("mix.com/")[1];
        return `https://mix.com/embed/${mixId}`;
      case "periscope":
        const periscopeId = url.split("periscope.tv/")[1];
        return `https://player.periscope.tv/v2/${periscopeId}`;
      case "vkontakte":
        const vkId = url.split("vk.com/")[1];
        return `https://vk.com/video_ext.php?oid=${vkId}&id=${vkId}&hash=${vkId}`;
      case "weibo":
        return `https://weibo.com/tv/show/${url.split("tv.show/")[1]}`;
      case "snapchat":
        return url; // Snapchat doesn't have easy embedding options
      case "pinterest":
        return url; // Pinterest doesn't allow direct embedding
      default:
        return "";
    }
  };

  return (
    <>
      <div className="min-h-[45vh] bg-gradient-to-b from-blue-900 via-pink-600 to-red-500 overflow-x-hidden">  

      <main className="flex relative flex-col items-center justify-center py-20 px-4 min-h-[50vh] md:min-h-0 flex-grow">
  <h2 className="text-white text-2xl px-6 md:px-1 font-semibold mb-4 text-center lg:text-5xl min-h-16">
    Download Videos From{" "}
    <span className="block md:inline text-orange-500 tracking-tighter">
      <Typewriter
        words={[
          "Facebook",
          "Instagram",
          "Twitter",
          "Youtube",
          "LinkedIn",
          "Snapchat",
          "SoundCloud",
          "TikTok",
          "Vimeo",
          "And More...",
        ]}
        cursor
        cursorStyle=""
        typeSpeed={80}
        deleteSpeed={50}
        delaySpeed={1500}
        loop
      />
    </span>
  </h2>

  <div className="flex flex-col md:flex-row text-gray-500 items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mt-4 relative xl:left-6">
    <input
      type="text"
      value={videoUrl}
      onChange={(e) => setVideoUrl(e.target.value)}
      placeholder="Enter media URL (e.g. Facebook)"
      className="p-3 rounded-md border border-gray-300 w-full md:w-72 focus:ring-2 focus:ring-blue-500 outline-none"
    />
    <button
      className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md w-full md:w-auto space-x-2"
      onClick={handleStartClick}
      disabled={isLoading} // Disable while loading
    >
      <span>{isLoading ? "Processing..." : "Start"}</span>
      <FaArrowRight />
    </button>
  </div>

  <p className="md:mt-4 mt-8 text-sm text-white text-center relative xl:left-6 mb-6">
    By using our service, you are accepting our{" "}
    <Link target="_blank" href="/terms&conditions" className="underline text-blue-950">
      terms of use
    </Link>
    .
  </p>

  {/* Video Preview & Download Button */}
  {isValidUrl && videoSrc && (
    <div className="mb-24 text-center">
      <div className="w-full max-w-md mx-auto">
        <h3 className="text-xl text-white mb-4 mt-5">Preview your video</h3>
        {platform === "youtube" ||
        platform === "vimeo" ||
        platform === "tiktok" ||
        platform === "facebook" ? (
          <div className="relative aspect-w-16 aspect-h-9 mb-6">
            <iframe
              width="100%"
              height="100%"
              src={getVideoEmbedUrl(platform, videoSrc)}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video Preview"
            ></iframe>
          </div>
        ) : (
          <p className="text-gray-300 mt-4 mb-5">Video preview is not available for this platform.</p>
        )}

        {/* Display Download Button if downloadLink is available */}
        {downloadLink ? (
          <a
            href={downloadLink}
            download
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
          >
            Download Video
          </a>
        ) : (
          <p className="text-white mt-4">Fetching download link...</p>
        )}
      </div>
    </div>
  )}


          {/* Error message */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {/* Custom CSS Partition Divider (Tilting Left, Starting from Right) */}
          <div className="absolute top-full z-30 right-0 w-full h-16 bg-gradient-to-l from-black to-white transform skew-y-[-6deg] flex justify-center items-center">
            {/* Social Media Icons in the divider */}
            <div ref={iconsRef} className="flex lg:space-x-40 space-x-20 text-white">
              <FaFacebook size={30} className="text-blue-600" />
              <FaInstagram size={30} className="text-gradient-to-r from-pink-500 to-yellow-500" />
              <FaTwitter size={30} className="text-blue-500" />
              <FaYoutube size={30} className="text-red-600" />
              <FaTiktok size={30} className="text-black" />
              <FaLinkedin size={30} className="text-blue-700" />
              <FaSnapchat size={30} className="text-yellow-400" />
              <FaSoundcloud size={30} className="text-orange-500" />
              <FaVimeo size={30} className="text-blue-700" />
            </div>
          </div>
        </main>

        <section className="bg-zinc-800 py-[120px] relative">
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-16 space-y-12 md:space-y-0 relative md:right-4">
            {/* Step 1 */}
            <div className="text-center">
              <div className="text-blue-600 text-4xl mb-4">
                <Image
                  src="/copy.png"
                  alt="Copy URL Icon"
                  width={70}
                  height={70}
                  className="mx-auto"
                />
              </div>
              <h3 className="font-semibold text-xl mt-4 text-gray-300">Copy URL</h3>
              <p className="text-sm text-gray-500 mt-2">
                Copy your media URL from Social Network.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="text-blue-600 text-4xl mb-4">
                <Image
                  src="/paste.png"
                  alt="Paste URL Icon"
                  width={70}
                  height={70}
                  className="mx-auto"
                />
              </div>
              <h3 className="font-semibold text-xl mt-4 text-gray-300">Paste in Search Field</h3>
              <p className="text-sm text-gray-500 mt-2">
                Paste media URL and click 'Start'.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center relative">
              <div className="text-blue-600 text-4xl mb-4">
                <Image
                  src="/download.png"
                  alt="Download Icon"
                  width={70}
                  height={70}
                  className="mx-auto"
                />
              </div>
              <h3 className="font-semibold text-xl mt-4 text-gray-300">Download</h3>
              <p className="text-sm text-gray-500 mt-2">
                Download files with one click.
              </p>
            </div>
          </div>

          {/* Custom CSS Partition Divider */}
          <div className="absolute top-full left-0 w-full h-16 bg-gradient-to-r from-black to-white transform skew-y-6 flex justify-center items-center">
            {/* Social Media Icons in the divider */}
            <div ref={iconRef} className="flex lg:space-x-40 space-x-20 text-white">
              <FaFacebook size={30} className="text-blue-600" />
              <FaInstagram size={30} className="text-gradient-to-r from-pink-500 to-yellow-500" />
              <FaTwitter size={30} className="text-blue-500" />
              <FaYoutube size={30} className="text-red-600" />
              <FaTiktok size={30} className="text-black" />
              <FaLinkedin size={30} className="text-blue-700" />
              <FaSnapchat size={30} className="text-yellow-400" />
              <FaSoundcloud size={30} className="text-orange-500" />
              <FaVimeo size={30} className="text-blue-700" />
            </div>
          </div>
        </section>

        {/* Supported Social Networks Section */}
        <section className="bg-white py-16">
          <h3 className="text-2xl font-bold text-center text-gray-700 mb-8 relative z-10">
            Supported Social Networks
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 md:px-16">
            {/* Facebook */}
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4 text-blue-600">
                <FaFacebook />
              </div>
              <p className="mt-2 text-gray-600">Facebook</p>
            </div>

            {/* Instagram */}
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4 text-gradient-to-r text-pink-600">
                <FaInstagram />
              </div>
              <p className="mt-2 text-gray-600">Instagram</p>
            </div>

            {/* Twitter */}
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4 text-blue-500">
                <FaTwitter />
              </div>
              <p className="mt-2 text-gray-600">Twitter</p>
            </div>

            {/* YouTube */}
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4 text-red-600">
                <FaYoutube />
              </div>
              <p className="mt-2 text-gray-600">YouTube</p>
            </div>

            {/* TikTok */}
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4 text-black">
                <FaTiktok />
              </div>
              <p className="mt-2 text-gray-600">TikTok</p>
            </div>

            {/* linkedin */}
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4 text-blue-700">
                <FaLinkedin />
              </div>
              <p className="mt-2 text-gray-600">LinkedIn</p>
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4 text-yellow-400">
                <FaSnapchat />
              </div>
              <p className="mt-2 text-gray-600">Snapchat</p>
            </div>

            {/* SoundCloud */}
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4 text-orange-500">
                <FaSoundcloud />
              </div>
              <p className="mt-2 text-gray-600">SoundCloud</p>
            </div>

            {/* Vimeo */}
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4 text-blue-700">
                <FaVimeo />
              </div>
              <p className="mt-2 text-gray-600">Vimeo</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4 text-gray-500">
        <FaGlobe/>
              </div>
              <p className="mt-2 text-gray-600">And more ...</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
