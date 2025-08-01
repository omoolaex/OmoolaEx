"use client";

import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaRedditAlien,
  FaWhatsapp,
  FaTelegramPlane,
  FaLink,
} from "react-icons/fa";

export default function SocialShare({ url, title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareButtons = [
    {
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${url}`,
      icon: <FaTwitter />,
      color: "hover:bg-sky-500",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      icon: <FaFacebookF />,
      color: "hover:bg-blue-700",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(
        title
      )}`,
      icon: <FaLinkedinIn />,
      color: "hover:bg-blue-600",
    },
    {
      name: "Reddit",
      href: `https://www.reddit.com/submit?url=${url}&title=${encodeURIComponent(
        title
      )}`,
      icon: <FaRedditAlien />,
      color: "hover:bg-orange-600",
    },
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        title + " " + url
      )}`,
      icon: <FaWhatsapp />,
      color: "hover:bg-green-500",
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${url}&text=${encodeURIComponent(
        title
      )}`,
      icon: <FaTelegramPlane />,
      color: "hover:bg-sky-400",
    },
  ];

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="text-lg font-semibold mb-3">Share this post:</h3>
      <div className="flex flex-wrap gap-3">
        {shareButtons.map((btn) => (
          <a
            key={btn.name}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md text-gray-700 transition ${btn.color}`}
          >
            {btn.icon}
            <span>{btn.name}</span>
          </a>
        ))}

        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-300 transition"
        >
          <FaLink />
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}