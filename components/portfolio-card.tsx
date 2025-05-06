"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/lib/portfolio-data";

interface PortfolioCardProps {
  item: PortfolioItem;
  isHighlighted: boolean;
}

export default function PortfolioCard({
  item,
  isHighlighted,
}: PortfolioCardProps) {
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
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "backend":
        return "from-emerald-400 to-teal-600";
      case "mobile":
        return "from-purple-400 to-indigo-600";
      case "frontend":
        return "from-rose-400 to-pink-600";
      case "nocode":
        return "from-amber-400 to-orange-600";
      case "api":
        return "from-cyan-400 to-blue-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  return (
    <div
      className={cn(
        "group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl bg-white shadow-md p-0",
        {
          [`outline outline-2 outline-offset-2 outline-orange-500`]: isHighlighted,
        }
      )}
    >
      <div
        className={cn(
          "relative z-10 h-full overflow-hidden rounded-xl",
          {
            "outline outline-2 outline-offset-2 bg-orange-500 text-white outline-orange-500": isHighlighted
          }
        )}
      >
        <div className="relative group-hover:scale-105 transition-transform duration-500">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            width={600}
            height={400}
            className="w-full h-96 object-cover"
          />
          <span
            className={cn(
              "absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-medium",
              getCategoryColor(item.category)
            )}
          >
            {item.highlightKeyword}
          </span>
        </div>

        <div className="p-6">
          <p className="block">
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>{" "}
          </p>
          <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {item.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* <div className="px-6 pb-6 flex justify-between">
          {item.demoUrl && (
            <a
              href={item.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} className="mr-1" />
              <span>Live Demo</span>
            </a>
          )}

          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} className="mr-1" />
              <span>Source Code</span>
            </a>
          )}
        </div> */}
       
      </div>
    </div>
  );
}
