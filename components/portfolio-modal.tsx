"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, Github, Calendar, Tag, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/lib/portfolio-data";

interface PortfolioModalProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
  onShare?: () => void;
}

export default function PortfolioModal({ item, isOpen, onClose, onShare }: PortfolioModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "backend":
        return "bg-emerald-500";
      case "mobile":
        return "bg-purple-500";
      case "frontend":
        return "bg-rose-500";
      case "nocode":
        return "bg-amber-500";
      case "api":
        return "bg-cyan-500";
      case "wordpress":
        return "bg-blue-500";
      case "shopify":
        return "bg-green-500";
      case "wix":
        return "bg-pink-500";
      case "webflow":
        return "bg-indigo-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full transition-all duration-200"
        >
          <X size={20} />
        </button>

        {/* Share Button */}
        {onShare && (
          <button
            onClick={onShare}
            className="absolute top-4 right-12 z-10 p-2 bg-white/80 hover:bg-white text-gray-700 hover:text-orange-600 rounded-full transition-all duration-200"
            title="Share this project"
          >
            <Share2 size={20} />
          </button>
        )}

        {/* Image Section */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Category Badge */}
          <span
            className={cn(
              "absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-medium",
              getCategoryColor(item.category)
            )}
          >
            {item.highlightKeyword}
          </span>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {item.title}
            </h2>
            <p className="text-white/90 text-sm md:text-base">
              {item.description}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-320px)]">
          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Tag size={18} className="text-gray-600" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Completion Date */}
            {item.completionDate && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Calendar size={18} className="text-gray-600" />
                  Completion Date
                </h3>
                <p className="text-gray-700">{item.completionDate}</p>
              </div>
            )}
          </div>

          {/* Long Description */}
          {item.longDescription && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
              <p className="text-gray-700 leading-relaxed">
                {item.longDescription}
              </p>
            </div>
          )}

          {/* Features */}
          {item.features && item.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Process */}
          {item.process && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Development Process</h3>
              <p className="text-gray-700 leading-relaxed">
                {item.process}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            {/* {item.demoUrl && (
              <a
                href={item.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <ExternalLink size={18} />
                View Live Demo
              </a>
            )} */}

            {/* {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Github size={18} />
                View Source Code
              </a>
            )} */}

            {!item.demoUrl && !item.githubUrl && (
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 