"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import PortfolioSnapshots from "./PortfolioSnapshots";

export default function PortfolioModal({ project, onClose }) {
  const [viewIndex, setViewIndex] = useState(null); // null = not in lightbox
  const snapshots = project?.projectSnapshots || [];

  // ✅ UseCallback for stable references
  const nextImage = useCallback(() => {
    setViewIndex((prev) => (prev === snapshots.length - 1 ? 0 : prev + 1));
  }, [snapshots.length]);

  const prevImage = useCallback(() => {
    setViewIndex((prev) => (prev === 0 ? snapshots.length - 1 : prev - 1));
  }, [snapshots.length]);

  // ✅ Keyboard navigation & close
  useEffect(() => {
    const handleKey = (e) => {
      if (viewIndex !== null) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
      if (e.key === "Escape") {
        if (viewIndex !== null) setViewIndex(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [viewIndex, nextImage, prevImage, onClose]);

  if (!project) return null; // ✅ Hooks are called before this return

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-2 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl w-full max-w-4xl relative p-4 sm:p-6 shadow-xl 
                     max-h-[80vh] overflow-y-auto"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white/80 text-black backdrop-blur-md shadow hover:bg-white hover:text-black"
          >
            <X size={20} />
          </button>

          {/* Featured Image */}
          {project.featuredImage && (
            <div className="relative w-full h-40 sm:h-56 md:h-64 lg:h-72 mb-4 sm:mb-6 rounded-lg overflow-hidden">
              <Image
                src={project.featuredImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          )}

          {/* Project Title */}
          <h2 className="text-lg sm:text-2xl font-semibold mb-3">
            {project.title}
          </h2>

          {/* Project Overview */}
          {project.projectOverview && (
            <div className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base space-y-2 leading-relaxed">
              <PortableText value={project.projectOverview} />
            </div>
          )}

          {/* Project Snapshots */}
          {snapshots.length > 0 && (
            <PortfolioSnapshots
              snapshots={snapshots}
              onViewImage={(idx) => setViewIndex(idx)}
            />
          )}

          {/* Tech Stack */}
          {project.techStack?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Technology Stack
              </h3>
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-100 px-2 py-1 rounded-md text-sm text-gray-700"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Live Website Link */}
          {project.liveWebsite && (
            <div className="mt-6">
              <a
                href={project.liveWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Visit Live Website
              </a>
            </div>
          )}
        </motion.div>

        {/* Full-screen Lightbox */}
        <AnimatePresence>
          {viewIndex !== null && (
            <motion.div
              className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-2 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewIndex(null)}
            >
              <motion.div
                className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.x < -100 || velocity.x < -500) nextImage();
                  else if (offset.x > 100 || velocity.x > 500) prevImage();
                }}
              >
                <Image
                  src={snapshots[viewIndex].asset.url}
                  alt={`Snapshot ${viewIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />

                {/* Close */}
                <button
                  onClick={() => setViewIndex(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
                >
                  <X size={24} />
                </button>

                {/* Prev/Next */}
                {snapshots.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2 bg-white/50 rounded-full hover:bg-white text-gray-800"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2 bg-white/50 rounded-full hover:bg-white text-gray-800"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
