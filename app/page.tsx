"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowDown, ExternalLink, Github, Share2, Copy } from "lucide-react";
import CategoryNav from "@/components/category-nav";
import PortfolioCard from "@/components/portfolio-card";
import PortfolioModal from "@/components/portfolio-modal";
import { portfolioItems, fetchPortfolioItems, PortfolioItem } from "@/lib/portfolio-data";
import Image from "next/image";
import { sectionInfo } from "@/lib/portfolio-data";

type SectionKey = keyof typeof sectionInfo;

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("wordpress");
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [modalItem, setModalItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dynamicPortfolioItems, setDynamicPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
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
  });

  // Fetch portfolio items from API
  useEffect(() => {
    const loadPortfolioItems = async () => {
      try {
        const items = await fetchPortfolioItems();
        setDynamicPortfolioItems(items);
      } catch (error) {
        console.error('Error loading portfolio items:', error);
        setDynamicPortfolioItems(portfolioItems);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioItems();
  }, []);

  // Handle URL parameters for highlighting specific cards and sections
  useEffect(() => {
    if (loading) return;

    const idParam = searchParams.get("id");
    const sectionParam = searchParams.get("section");
    const modalParam = searchParams.get("modal");

    // Handle card highlighting
    if (idParam) {
      const ids = idParam.split(",");
      setHighlightedIds(ids);

      // If there's at least one ID, set the active category to the first highlighted item's category
      if (ids.length > 0) {
        const firstItem = dynamicPortfolioItems.find((item) => item.id === ids[0]);
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
      const modalItem = dynamicPortfolioItems.find((item) => item.id === modalParam);
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
  }, [searchParams, dynamicPortfolioItems, loading]);

  const scrollToCategory = (category: string) => {
    if (sectionRefs.current[category]) {
      sectionRefs.current[category]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setTimeout(() => {
      scrollToCategory(category);
    }, 0);
  };

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
    const newUrl = `${window.location.pathname}${currentParams.toString() ? '?' + currentParams.toString() : ''}`;
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
    ...priorityCategories.filter(cat => allCategories.includes(cat)),
    ...allCategories.filter(cat => !priorityCategories.includes(cat)).sort()
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <header className="flex flex-wrap items-center justify-center gap-2 md:gap-0 md:justify-between sticky top-0 bg-gray-50 z-50 text-center px-4 md:px-[100px]">
        <div className="flex items-end gap-5">
          <Image src="/wwt_logo.png" alt="Logo" width={250} height={200} />
          <p className="hidden md:block text-sm -mb-0.5 font-bold text-gray-900">A California Innovation Company</p>
        </div>
        <div>
          <h2 className="md:text-3xl text-xl text-orange-600 font-bold">Our Dynamic Portfolio</h2>
          <a href="mailto:support@waywisetech.com" className="text-orange-600 font-bold text-sm mt-2 block">support@waywisetech.com</a>
        </div>
        <div className="max-w-4xl  py-5 ">
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </header>

      {/* Portfolio Sections - One for each category */}
      {categories.map((category) => (
        <section
          key={category}
          ref={(el) => {
            sectionRefs.current[category] = el as HTMLDivElement | null;
          }}
          className={`py-[120px] px-4 bg-white border-b-4 border-gray-200 last:border-0 transition-all duration-300 ${
            highlightedSection === category ? 'bg-orange-50 border-orange-300' : ''
          }`}
          id={`section-${category}`}
        >
          <div className="px-4 md:px-16">
            <div className="flex flex-col items-center gap-1 pb-[70px] relative">
              <h2 className="text-5xl font-semibold text-center capitalize">
                {sectionInfo[category as SectionKey]?.title || `${category} Projects`}
              </h2>
              <p className="text-2xl text-gray-300">
                {sectionInfo[category as SectionKey]?.description || "Explore my work in this category."}
              </p>
              
              {/* Share Section Button */}
              <button
                onClick={() => copyToClipboard(generateSectionShareUrl(category))}
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
                  onShare={() => copyToClipboard(generateModalShareUrl(item.id))}
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
        onShare={() => modalItem && copyToClipboard(generateModalShareUrl(modalItem.id))}
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
