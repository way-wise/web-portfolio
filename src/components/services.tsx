"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

const services = [
  {
    title: "Website Strategy",
    description:
      "Let's build your success story by starting with a powerful website strategy. At Musemind, we formulate strategies that connect with your audience, maximize engagement, and deliver the results your business deserves.",
    image: "/images/services/service-1.webp",

  },
  {
    title: "Website Design & Re-Design",
    description:
      "Enhance your website's look and feel with modern, engaging designs that captivate visitors and boost conversion rates.",
    image: "/images/services/service-2.webp",
  },
  {
    title: "Website Information Architecture",
    description:
      "We organize your website's content intuitively, making navigation easier and improving user interaction and overall site performance.",
    image: "/images/services/service-3.webp",
  },
  {
    title: "Webflow Development",
    description:
      "To make our client's visions a reality, we employ Webflow to build fully responsive sites with elegant animations. Your audience will have a dynamic, user-focused platform that stands out and delivers a seamless experience.",
    image: "/images/services/service-4.webp",
  },
  {
    title: "Wordpress Development",
    description:
      "We help you to explore the full potential of your digital product with our comprehensive UX audit. We identify pain points, usability issues, and areas for improvement, providing actionable insights to enhance user satisfaction and boost conversion rates.",
    image: "/images/services/service-5.webp",
  },
  {
    title: "Framer Development",
    description:
      "With Framer, we transform your vision into interactive, high-quality prototypes and websites. You'll enjoy a consistent journey from brainstorming to a beautifully functional design that wows your audience.",
    image: "/images/services/service-6.webp",
  },
  {
    title: "Website SEO Optimization",
    description:
      "We optimize your website to stand out in search engines, drive organic traffic, and boost visibility. You'll enjoy higher rankings, more organic traffic, and a stronger online presence that drives real results.",
    image: "/images/services/service-7.webp",
  },
  {
    title: "CMS Development",
    description:
      "We develop custom CMS solutions, allowing you to effortlessly manage your content without needing technical expertise or developer assistance.",
    image: "/images/services/service-8.webp",
  },
  {
    title: "Website Maintenance & Support",
    description:
      "With our comprehensive website maintenance and support, we've got you covered. From keeping things secure to ensuring everything runs smoothly, you'll have peace of mind knowing your site is always in top shape.",
    image: "/images/services/service-9.webp",
  },
]

export function Services() {
  const sectionRef = useRef(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Fade in cards when they come into view
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section className="py-20" id="services" ref={sectionRef}>
      <div className="container">
        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="font-teko text-4xl tracking-wide font-bold leading-tight sm:text-4xl md:text-5xl">
            Achieve success with our all-in-one web design and development services
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Card
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group relative w-full h-full rounded-xl overflow-hidden z-[1111] flex flex-col items-center justify-center shadow-[20px_20px_60px_#bebebe,_-20px_-20px_60px_#ffffff]"
            >
              {/* Background layer with blur effect */}
              <div className="absolute top-[5px] left-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] z-[2] bg-white/95 backdrop-blur-lg rounded-lg overflow-hidden outline outline-2 outline-white" />
              
              {/* Animated blob with staggered animation */}
              <div 
                className="absolute -z-10 top-1/2 left-1/2 size-[300px] rounded-full bg-[#748b1d] opacity-100 blur-xl animate-[blob-bounce_8s_infinite_ease]"
                style={{ animationDelay: `${i * 2}s` }}
              />
              
              {/* Content */}
              <CardContent className="relative z-[3] space-y-4 p-6">
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

