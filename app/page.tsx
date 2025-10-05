"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowDown,
  ExternalLink,
  Github,
  Share2,
  Copy,
  Menu,
  X,
} from "lucide-react";
import CategoryNav from "@/components/category-nav";
import PortfolioCard from "@/components/portfolio-card";
import PortfolioModal from "@/components/portfolio-modal";
import {
  portfolioItems as fallbackItems,
  PortfolioItem,
} from "@/lib/portfolio-data";
import Image from "next/image";
import { sectionInfo } from "@/lib/portfolio-data";

type SectionKey = keyof typeof sectionInfo;

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("wordpress");
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(
    null
  );
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [modalItem, setModalItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dynamicPortfolioItems, setDynamicPortfolioItems] =
    useState<PortfolioItem[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({
    backend: null,
    mobile: null,
    frontend: null,
    nocode: null,
    wordpress: null,
    shopify: null,
    wix: null,
    webflow: null,
    api: null,
    "email-templates": null,
    react: null,
    nextjs: null,
    tailwind: null,
  });

  /**
   * Fetch portfolio items from the database
   */
  const fetchPortfolioItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/portfolio', {
        cache: 'no-store'
      });
      
      if (response.ok) {
        const data = await response.json();
        setDynamicPortfolioItems(data);
      } else {
        console.warn('Failed to fetch from API, using fallback data');
        setDynamicPortfolioItems(fallbackItems);
      }
    } catch (error) {
      console.warn('Error fetching from API, using fallback data:', error);
      setDynamicPortfolioItems(fallbackItems);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch portfolio items on component mount
  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  // Handle URL parameters for highlighting specific cards and sections
  useEffect(() => {
    const idParam = searchParams.get("id");
    const sectionParam = searchParams.get("section");
    const modalParam = searchParams.get("modal");

    // Handle card highlighting
    if (idParam) {
      const ids = idParam.split(",");
      setHighlightedIds(ids);

      // If there's at least one ID, set the active category to the first highlighted item's category
      if (ids.length > 0) {
        const firstItem = dynamicPortfolioItems.find(
          (item) => item.id === ids[0]
        );
        if (firstItem) {
          setActiveCategory(firstItem.category);

          // Scroll to the section after a delay
          const timer = setTimeout(() => {
            if (sectionRefs.current[firstItem.category]) {
              sectionRefs.current[firstItem.category]?.scrollIntoView({
                behavior: "smooth",
              });
            }
          }, 500);

          return () => clearTimeout(timer);
        }
      }
    } else {
      setHighlightedIds([]);
    }

    // Handle section highlighting
    if (sectionParam) {
      setHighlightedSection(sectionParam);
      setActiveCategory(sectionParam);

      // Scroll to the section after a delay
      const timer = setTimeout(() => {
        if (sectionRefs.current[sectionParam]) {
          sectionRefs.current[sectionParam]?.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setHighlightedSection(null);
    }

    // Handle modal opening from URL
    if (modalParam) {
      const modalItem = dynamicPortfolioItems.find(
        (item) => item.id === modalParam
      );
      if (modalItem) {
        setModalItem(modalItem);
        setIsModalOpen(true);

        // Also highlight the card
        setHighlightedIds([modalParam]);
        setActiveCategory(modalItem.category);

        // Scroll to the section after a delay
        const timer = setTimeout(() => {
          if (sectionRefs.current[modalItem.category]) {
            sectionRefs.current[modalItem.category]?.scrollIntoView({
              behavior: "smooth",
            });
          }
        }, 500);

        return () => clearTimeout(timer);
      }
    }
  }, [searchParams, dynamicPortfolioItems]);

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(`section-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Close mobile menu when category is selected
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      scrollToCategory(category);
    }, 0);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Handle keyboard events for mobile menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Generate shareable URL for specific cards
  const generateCardShareUrl = (cardIds: string[]) => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    params.set("id", cardIds.join(","));
    return `${baseUrl}?${params.toString()}`;
  };

  // Generate shareable URL for specific section
  const generateSectionShareUrl = (section: string) => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    params.set("section", section);
    return `${baseUrl}?${params.toString()}`;
  };

  // Generate shareable URL for modal view
  const generateModalShareUrl = (cardId: string) => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    params.set("modal", cardId);
    return `${baseUrl}?${params.toString()}`;
  };

  // Copy URL to clipboard
  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  // Handle modal open/close
  const openModal = (item: any) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalItem(null);

    // Remove modal parameter from URL when closing
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete("modal");
    const newUrl = `${window.location.pathname}${
      currentParams.toString() ? "?" + currentParams.toString() : ""
    }`;
    router.replace(newUrl);
  };

  // Group portfolio items by category
  const itemsByCategory = dynamicPortfolioItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PortfolioItem[]>);

  // Get unique categories and sort them with priority categories first
  const priorityCategories = ["wordpress", "shopify", "wix", "webflow"];
  const allCategories = Object.keys(itemsByCategory);

  // Sort categories: priority categories first, then alphabetically
  const categories = [
    ...priorityCategories.filter((cat) => allCategories.includes(cat)),
    ...allCategories.filter((cat) => !priorityCategories.includes(cat)).sort(),
  ];

  return (
    <main className="min-h-screen">
      {/* Mobile Top Header - Only shows when menu is open */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
          <button
            onClick={closeMobileMenu}
            className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
            aria-label="Close mobile menu"
          >
            <X size={24} />
          </button>
        </div>
      )}

      {/* Hero Section */}
      <header
        className={`flex flex-wrap md:flex-nowrap items-center justify-between gap-2 md:gap-0 md:justify-between sticky top-0 bg-gray-50 z-40 text-center px-4 md:px-[100px] py-4 ${
          isMobileMenuOpen ? "md:top-0 top-16" : "top-0"
        }`}
      >
        <div className="flex flex-col w-full md:hidden">
          <h2 className="md:text-3xl text-lg text-orange-600 font-bold">
            Our Dynamic Portfolio
          </h2>
          <a
            href="mailto:support@waywisetech.com"
            className="text-orange-600 font-bold text-xs md:text-sm block"
          >
            support@waywisetech.com
          </a>
        </div>
        <div className="flex items-end gap-2 md:gap-5">
          <Image
            src="/wwt_logo.png"
            alt="Logo"
            width={250}
            height={200}
            className="w-32 md:w-auto max-w-48"
          />
          <p className="hidden md:block text-sm -mb-0.5 font-bold text-gray-900">
            A California Innovation Company
          </p>
        </div>
        <div className="hidden md:flex md:flex-col flex-1">
          <h2 className="md:text-3xl text-lg text-orange-600 font-bold">
            Our Dynamic Portfolio
          </h2>
          <a
            href="mailto:support@waywisetech.com"
            className="text-orange-600 font-bold text-xs md:text-sm mt-1 md:mt-2 block"
          >
            support@waywisetech.com
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block max-w-4xl py-5">
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header - Hidden since we have top header now */}
        <div className="hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
              aria-label="Close mobile menu"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <div className="p-6 flex flex-col h-full pt-20">
          <div className="space-y-6 flex-1">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Categories
              </h4>
              <div className="space-y-2">
                <CategoryNav
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                  mobile={true}
                />
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </h4>
              <div className="space-y-2">
                <a
                  href="mailto:support@waywisetech.com"
                  className="block text-gray-700 hover:text-orange-600 transition-colors"
                >
                  support@waywisetech.com
                </a>
                <p className="text-sm text-gray-600">
                  A California Innovation Company
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
                aria-label="LinkedIn"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col items-center justify-center min-h-[60vh] bg-purple-50">
        <div className="container mx-auto px-4 md:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-[600px]">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Software Consulting and Development
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We help companies create innovative digital solutions and
                transform their brands for the modern age.
              </p>
              <button
                onClick={() => {
                  const firstCategory = categories[0];
                  if (firstCategory) {
                    scrollToCategory(firstCategory);
                  }
                }}
                className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                View Our Work
              </button>
            </div>
            <div className="flex items-center justify-center p-4">
              <Image
                src={`/hero-right.jpg`}
                alt={`hero-right`}
                width={600}
                height={600}
                className="transition-opacity rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          <span className="ml-3 text-gray-600">Loading portfolio...</span>
        </div>
      )}

      {/* Portfolio Sections - One for each category */}
      {!isLoading && categories.map((category) => (
        <section
          key={category}
          ref={(el) => {
            sectionRefs.current[category] = el as HTMLDivElement | null;
          }}
          className={`py-[120px] px-4 bg-white border-b-4 border-gray-200 last:border-0 transition-all duration-300 ${
            highlightedSection === category
              ? "bg-orange-50 border-orange-300"
              : ""
          }`}
          id={`section-${category}`}
        >
          <div className="px-4 md:px-16">
            <div className="flex flex-col items-center gap-1 pb-[70px] relative">
              <h2 className="text-5xl font-semibold text-center capitalize">
                {sectionInfo[category as SectionKey]?.title ||
                  `${category} Projects`}
              </h2>
              <p className="text-2xl text-gray-800">
                {sectionInfo[category as SectionKey]?.description ||
                  "Explore my work in this category."}
              </p>

              {/* Share Section Button */}
              <button
                onClick={() =>
                  copyToClipboard(generateSectionShareUrl(category))
                }
                className="absolute top-0 right-0 p-2 text-gray-500 hover:text-orange-600 transition-colors"
                title="Share this section"
              >
                <Share2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {itemsByCategory[category].map((item, index) => (
                <PortfolioCard
                  key={item.id + index}
                  item={item}
                  isHighlighted={highlightedIds.includes(item.id)}
                  onShare={() =>
                    copyToClipboard(generateModalShareUrl(item.id))
                  }
                  onClick={() => openModal(item)}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Portfolio Modal */}
      <PortfolioModal
        item={modalItem}
        isOpen={isModalOpen}
        onClose={closeModal}
        onShare={() =>
          modalItem && copyToClipboard(generateModalShareUrl(modalItem.id))
        }
      />

      {/* Share Tooltip */}
      {showShareTooltip && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <Copy size={16} />
          <span>URL copied to clipboard!</span>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold">Our Portfolio</h3>
            <p className="text-gray-400 mt-2">
              Showcasing my development journey
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com"
              className="hover:text-gray-300 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-gray-300 transition-colors"
            >
              <ExternalLink size={24} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
