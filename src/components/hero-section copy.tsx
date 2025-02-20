import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundImage: "url('/images/hero-bg.webp')" }} id="about">
      {/* Add video background */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video> */}
      
      {/* Add overlay to ensure text readability */}
      {/* <div className="absolute inset-0 bg-black/50" /> */}
      
      {/* Existing content with updated text colors for better contrast */}
      <div className="container relative py-20 sm:py-40">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className={`text-balance font-roboto text-2xl sm:text-4xl tracking-wider font-bold md:text-8xl text-black`}>
            Creating The Future of Software Technology
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-lg text-gray-800">
            We transform web solutions with our innovative and future-proof
            software products, empowering businesses to thrive and scale in the
            ever-evolving digital landscape. Our team of experts is dedicated to
            delivering cutting-edge solutions that help businesses stay ahead in
            the digital age.
          </p>
          <div className="flex justify-center items-center gap-4 mt-8">
            <Link href="https://www.upwork.com/agencies/1826147102571778048/" target="_blank"  className="px-12 py-2.5 font-semiboid shadow-lg rounded-full text-base uppercase transition-all duration-300 bg-primary text-white hover:bg-primary/80">
              Hire Us
            </Link>
            <Link href="#showcase" className="font-semibold px-12 py-2.5 rounded-full text-base uppercase shadow-lg transition-all duration-300 bg-white text-primary hover:bg-primary/80 hover:text-white">
                Showcase
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
