"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const categories = [
  { 
    id: "nocode", 
    label: "No-Code Solutions",
    subcategories: [
      { id: "wordpress", label: "WordPress" },
      { id: "shopify", label: "Shopify" },
      { id: "wix", label: "Wix" },
      { id: "webflow", label: "Webflow" }
    ]
  },
  { id: "backend", label: "Backend" },
  { id: "api", label: "API" },
  { id: "mobile", label: "Mobile App" },
  { id: "frontend", label: "Frontend",
    subcategories: [
      { id: "email-templates", label: "Email Templates" },
      { id: "react", label: "React" },
      { id: "nextjs", label: "Next.js" },
      { id: "tailwind", label: "Tailwind" },
    ]
  },
]

interface CategoryNavProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  mobile?: boolean
}

export default function CategoryNav({ activeCategory, onCategoryChange, mobile = false }: CategoryNavProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExpandedCategory(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "backend":
        return "from-emerald-400 to-teal-600"
      case "api":
        return "from-cyan-400 to-blue-600"
      case "mobile":
        return "from-purple-400 to-indigo-600"
      case "frontend":
        return "from-rose-400 to-pink-600"
      case "nocode":
        return "from-amber-400 to-orange-600"
      case "wordpress":
        return "from-blue-400 to-blue-600"
      case "shopify":
        return "from-green-400 to-green-600"
      case "wix":
        return "from-purple-400 to-purple-600"
      case "webflow":
        return "from-cyan-400 to-cyan-600"
      case "email-templates":
        return "from-pink-400 to-rose-600"
      case "react":
        return "from-blue-400 to-cyan-600"
      case "nextjs":
        return "from-gray-400 to-gray-600"
      case "tailwind":
        return "from-teal-400 to-cyan-600"
      default:
        return "from-gray-700 to-gray-900"
    }
  }

  const handleCategoryClick = (category: any) => {
    if (category.subcategories) {
      setExpandedCategory(expandedCategory === category.id ? null : category.id)
    } else {
      onCategoryChange(category.id)
      setExpandedCategory(null)
    }
  }

  const handleSubcategoryClick = (subcategoryId: string) => {
    onCategoryChange(subcategoryId)
    setExpandedCategory(null)
  }

  return (
    <div className={cn(
      "flex gap-3",
      mobile ? "flex-col" : "flex-wrap justify-center"
    )} ref={dropdownRef}>
      {categories.map((category) => (
        <div key={category.id} className={cn("relative", mobile ? "w-full" : "")}>
          <button
            onClick={() => handleCategoryClick(category)}
            className={cn(
              "px-3 md:px-6 py-3 md:py-3 rounded-full font-medium transition-all text-xs md:text-lg flex items-center gap-2",
              mobile ? "w-full justify-between text-left" : "",
              activeCategory === category.id || category.subcategories?.some(sub => activeCategory === sub.id)
                ? "text-white shadow-lg bg-gradient-to-r"
                : "bg-white text-gray-700 hover:bg-gray-100",
              (activeCategory === category.id || category.subcategories?.some(sub => activeCategory === sub.id)) && getCategoryGradient(category.id),
            )}
          >
            {category.label}
            {category.subcategories && (
              <svg
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  expandedCategory === category.id ? "rotate-180" : ""
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
          
          {category.subcategories && expandedCategory === category.id && (
            <div className={cn(
              "bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[200px] animate-in fade-in-0 slide-in-from-top-2 duration-200",
              mobile ? "relative mt-2 w-full" : "absolute top-full left-0 mt-2"
            )}>
              {category.subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => handleSubcategoryClick(subcategory.id)}
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150",
                    activeCategory === subcategory.id
                      ? "bg-gradient-to-r text-white shadow-sm"
                      : "text-gray-700",
                    activeCategory === subcategory.id && getCategoryGradient(subcategory.id)
                  )}
                >
                  {subcategory.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
