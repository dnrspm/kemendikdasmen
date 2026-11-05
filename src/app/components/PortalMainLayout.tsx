import { Header } from "@/app/components/Header";
import { DaftarTugas } from "@/app/components/DaftarTugas";
import { MenuLainnyaModal } from "@/app/components/MenuLainnyaModal";
import { KehadiranHariIni } from "@/app/components/KehadiranHariIni";
import { MenuUtamaGrid } from "@/app/components/MenuUtamaGrid";
import { BannerMockup } from "@/app/components/BannerMockup";
import React from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PortalMainLayoutProps {
  onNavigateToPusatInformasi?: () => void;
  onNavigateToOrganizations?: () => void;
  onNavigateToLayanan?: () => void;
  onNavigateToPemberitahuan?: () => void;
  onNavigateToPengaturanUmum?: () => void;
  onNavigateToManajemenSKP?: () => void;
  onNavigateToDashboardAnalitik?: () => void;
  onNavigateToDataPribadi?: () => void;
  onNavigateToProfilASN?: () => void;
}

export default function PortalMainLayout({
  onNavigateToPusatInformasi,
  onNavigateToOrganizations,
  onNavigateToLayanan,
  onNavigateToPemberitahuan,
  onNavigateToPengaturanUmum,
  onNavigateToManajemenSKP,
  onNavigateToDashboardAnalitik,
  onNavigateToDataPribadi,
  onNavigateToProfilASN
}: PortalMainLayoutProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false })
  ]);
  
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [menuLainnyaOpen, setMenuLainnyaOpen] = React.useState(false);
  
  const banners = [
    { type: 'fitur-portal' as const },
    { type: 'pusat-informasi' as const },
    { type: 'transformasi' as const },
    { type: 'pelayanan' as const }
  ];
  
  React.useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="bg-background min-h-screen w-full">
      <Header onNotificationViewAll={onNavigateToPemberitahuan} />
      
      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-[24px] py-[32px]">
        <div className="flex flex-col gap-[24px] w-full">
          {/* Banner Section - Kehadiran + Carousel */}
          <div className="flex flex-col lg:grid lg:grid-cols-[1.5fr_2.5fr] gap-[24px] w-full">
            {/* Right Column - Banner Carousel (First on mobile, Second on desktop) */}
            <div className="bg-card border border-border rounded-[var(--radius-card)] overflow-hidden relative aspect-[3/2] sm:aspect-[2.618/1] lg:aspect-auto lg:order-2 lg:h-0 lg:min-h-full">
              <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                  {banners.map((banner, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
                      <BannerMockup type={banner.type} />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Arrows - Desktop Only */}
              <button
                onClick={scrollPrev}
                className="hidden lg:flex absolute left-[16px] top-1/2 -translate-y-1/2 z-10 w-[40px] h-[40px] items-center justify-center bg-white/20 hover:bg-white/30 rounded-full border border-white/30 transition-all hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-[24px] h-[24px] text-white" />
              </button>
              
              <button
                onClick={scrollNext}
                className="hidden lg:flex absolute right-[16px] top-1/2 -translate-y-1/2 z-10 w-[40px] h-[40px] items-center justify-center bg-white/20 hover:bg-white/30 rounded-full border border-white/30 transition-all hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="w-[24px] h-[24px] text-white" />
              </button>
              
              {/* Carousel Indicators */}
              <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex gap-[8px] z-10">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`w-[8px] h-[8px] rounded-full transition-all ${
                      currentSlide === index 
                        ? 'bg-white w-[24px]' 
                        : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Left Column - Widget Kehadiran (Second on mobile, First on desktop) */}
            <div className="lg:order-1">
              <KehadiranHariIni />
            </div>
          </div>
          
          {/* Menu Utama Section */}
          <div 
            className="bg-card border content-stretch flex flex-col gap-[24px] items-start px-[20px] py-[24px] rounded-[var(--radius-card)] w-full relative"
            style={{ borderColor: 'var(--sd-gray-20)' }}
          >
            <div className="flex items-center justify-between w-full">
              <h3 
                className="font-['Inter',sans-serif] text-foreground uppercase" 
                style={{ fontSize: '13px', fontWeight: 600, lineHeight: '16px' }}
              >
                Menu Utama
              </h3>
            </div>
            <MenuUtamaGrid
              onNavigateToKepegawaian={onNavigateToDataPribadi}
              onNavigateToProfilASN={onNavigateToProfilASN}
              onNavigateToDashboardAnalitik={onNavigateToDashboardAnalitik}
              onNavigateToMenuLainnya={() => setMenuLainnyaOpen(true)}
            />
          </div>

          <DaftarTugas />
          <MenuLainnyaModal
            open={menuLainnyaOpen}
            onClose={() => setMenuLainnyaOpen(false)}
            onNavigate={{
              kepegawaian: onNavigateToDataPribadi,
              profilASN: onNavigateToProfilASN,
              dasbor: onNavigateToDashboardAnalitik,
              pengaturan: onNavigateToPengaturanUmum,
            }}
          />
        </div>
      </div>
    </div>
  );
}