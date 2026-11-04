import React from 'react';
import imgPelayanan from "figma:asset/9440fed5d52945bc69cd795a91d7b60dd2cb4142.png";
import imgFiturPortal from "@/imports/Slider_Pelajari_Fitur_Portal_1.jpg";
import imgPusatInformasi from "@/imports/Slider_Pusin_Pusban_1.jpg";

interface BannerMockupProps {
  type: 'berakhlak' | 'transformasi' | 'pelayanan' | 'fitur-portal' | 'pusat-informasi';
}

export function BannerMockup({ type }: BannerMockupProps) {
  const bannerContent = {
    berakhlak: {
      title: 'Core Values ASN BerAKHLAK',
      subtitle: 'Berorientasi Pelayanan, Akuntabel, Kompeten, Harmonis, Loyal, Adaptif, Kolaboratif',
      points: [
        'Berorientasi Pelayanan',
        'Akuntabel',
        'Kompeten',
        'Harmonis',
        'Loyal',
        'Adaptif',
        'Kolaboratif'
      ]
    },
    transformasi: {
      title: 'Transformasi Digital Pendidikan',
      subtitle: 'Mendorong Inovasi dan Digitalisasi di Lingkungan Kemendikdasmen',
      points: [
        'Platform Digital Terpadu',
        'Data-Driven Decision Making',
        'Kolaborasi Antar Unit',
        'Peningkatan Kualitas Layanan'
      ]
    },
    pelayanan: {
      title: 'Pelayanan Prima untuk Indonesia',
      subtitle: 'Komitmen Kami Memberikan Layanan Terbaik untuk Pendidikan Berkualitas',
      points: [
        'Responsif & Cepat',
        'Transparan & Akuntabel',
        'Profesional & Kompeten',
        'Berintegritas Tinggi'
      ]
    }
  };

  const content = bannerContent[type];

  if (type === 'fitur-portal') {
    return (
      <div className="relative w-full h-full overflow-hidden bg-sd-yellow-30">
        <img
          src={imgFiturPortal}
          alt="Pelajari Fitur Portal Lebih Mudah di Sini"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (type === 'pusat-informasi') {
    return (
      <div className="relative w-full h-full overflow-hidden bg-[#0EA5E9]">
        <img
          src={imgPusatInformasi}
          alt="Pusat Informasi dan Pusat Bantuan Portal Kemendikdasmen"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (type === 'pelayanan') {
    return (
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={imgPelayanan}
          alt="Pelayanan Prima untuk Indonesia"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-white">
      {/* Diagonal Red-White Pattern Background */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" viewBox="0 0 1200 400" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <pattern id={`diagonalStripes-${type}`} patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
              <rect width="20" height="40" fill="var(--sd-red-60)" />
              <rect x="20" width="20" height="40" fill="#FFFFFF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#diagonalStripes-${type})`} opacity="0.15" />
        </svg>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 via-red-700/85 to-red-800/90"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-[48px] py-[32px]">
        <div className="flex-1 flex flex-col gap-[16px] z-10">
          {/* Logo Area - Placeholder */}
          <div className="flex items-center gap-[12px] mb-[8px]">
            <div className="w-[48px] h-[48px] bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
              <div className="w-[32px] h-[32px] bg-white/90 rounded-full"></div>
            </div>
            <div className="text-white/90 font-['Inter',sans-serif] font-medium text-[14px] leading-tight">
              KEMENDIKDASMEN
            </div>
          </div>

          {/* Main Title */}
          <h2 className="font-['Inter',sans-serif] font-bold text-white text-[36px] leading-tight tracking-tight max-w-[650px]">
            {content.title}
          </h2>

          {/* Subtitle */}
          <p className="font-['Inter',sans-serif] font-medium text-white/95 text-[16px] leading-relaxed max-w-[600px]">
            {content.subtitle}
          </p>

          {/* Points - Compact Grid */}
          <div className="grid grid-cols-2 gap-x-[24px] gap-y-[8px] mt-[12px] max-w-[600px]">
            {content.points.slice(0, 4).map((point, index) => (
              <div key={index} className="flex items-center gap-[8px]">
                <div className="w-[6px] h-[6px] bg-white rounded-full flex-shrink-0"></div>
                <span className="font-['Inter',sans-serif] font-medium text-white/90 text-[13px] leading-tight">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Decorative Element */}
        <div className="absolute right-0 top-0 bottom-0 w-[300px] opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 300 400" preserveAspectRatio="none">
            <circle cx="250" cy="100" r="120" fill="white" opacity="0.3" />
            <circle cx="280" cy="300" r="80" fill="white" opacity="0.2" />
            <circle cx="200" cy="200" r="150" fill="white" opacity="0.15" />
          </svg>
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>
    </div>
  );
}
