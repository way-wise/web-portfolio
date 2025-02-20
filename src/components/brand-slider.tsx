import Image from "next/image";

const BrandSlider = () => {
  return (
      <div className="slider-container py-10">
        <div className="slider-content">
          {/* original set */}
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-01.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-02.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-05.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-04.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-05.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
          {/* Cloned set for seamless loop */}
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-01.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-02.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-05.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-04.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-05.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-01.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-02.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-05.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-04.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
          <div className="flex items-center justify-center shrink min-w-[200px] px-12">
            <Image src="/images/brands/brand-05.png" alt="Naffco" width={200} height={100} className="grayscale w-full h-auto" />
          </div>
        </div>
      </div>
  );
};

export default BrandSlider;
