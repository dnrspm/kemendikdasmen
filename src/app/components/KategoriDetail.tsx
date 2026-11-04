import { ChevronRight, Home, Clock, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { Header } from "@/app/components/Header";
import { useEffect } from 'react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  views: number;
}

interface SubCategory {
  id: string;
  name: string;
  description: string;
  articles: Article[];
}

interface Category {
  title: string;
  icon: any;
  color: string;
  subcategories: SubCategory[];
}

interface KategoriDetailProps {
  category: Category;
  onBack: () => void;
  onBackToPusatInformasi: () => void;
  onNavigateToArtikel?: (articleId: string) => void;
}

export function KategoriDetail({ category, onBack, onBackToPusatInformasi, onNavigateToArtikel }: KategoriDetailProps) {
  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const IconComponent = category.icon;

  return (
    <div className="bg-[#f9f9f9] min-h-screen w-full">
      {/* Navigation Header */}
      <Header onLogoClick={onBack} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-[#EFEFEF]">
        <div className="max-w-[1440px] mx-auto px-[24px] py-[16px]">
          <nav className="flex items-center gap-[8px]" aria-label="Breadcrumb">
            <button
              onClick={onBack}
              className="flex items-center gap-[6px] text-[var(--text-sm)] text-muted-foreground hover:text-primary transition-colors"
            >
              <Home className="w-[16px] h-[16px]" />
              <span>Beranda</span>
            </button>
            <ChevronRight className="w-[16px] h-[16px] text-border" />
            <button
              onClick={onBackToPusatInformasi}
              className="text-muted-foreground hover:text-primary transition-colors font-bold font-normal"
            >
              Pusat Informasi
            </button>
            <ChevronRight className="w-[16px] h-[16px] text-border" />
            <span className="text-[var(--text-sm)] text-foreground font-[var(--font-weight-medium)]">
              {category.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-white border-b border-[#EFEFEF]">
        <div className="max-w-[1280px] mx-auto px-[24px] py-[32px]">
          <div className="flex items-center gap-[16px] mb-[16px]">
            <div
              className="w-[56px] h-[56px] rounded-[12px] flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${category.color}15` }}
            >
              <IconComponent
                className="w-[28px] h-[28px]"
                style={{ color: category.color }}
              />
            </div>
            <div>
              <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-medium)] text-[#323232]">
                {category.title}
              </h1>
              <p className="text-[var(--text-base)] text-[#656a6c] mt-[4px]">
                {category.subcategories.length} Subkategori • {category.subcategories.reduce((total, sub) => total + sub.articles.length, 0)} Artikel
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-[24px] py-[40px]">
        <div className="flex flex-col gap-[48px]">
          {category.subcategories.map((subcategory, subIndex) => (
            <section key={subcategory.id}>
              {/* Subcategory Header */}
              <div className="mb-[24px]">
                <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-[#323232] mb-[8px]">
                  {subcategory.name}
                </h2>
                <p className="text-[var(--text-sm)] text-[#656a6c]">
                  {subcategory.description}
                </p>
              </div>

              {/* Article Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                {subcategory.articles.map((article) => (
                  <button
                    key={article.id}
                    className="bg-white rounded-[8px] border border-[#ADADAD] p-[20px] text-left hover:shadow-md hover:border-primary transition-all group"
                    onClick={() => onNavigateToArtikel && onNavigateToArtikel(article.id)}
                  >
                    <div className="flex flex-col gap-[12px]">
                      {/* Article Title */}
                      <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-[#323232] line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>

                      {/* Article Excerpt */}
                      <p className="text-[var(--text-sm)] text-[#656a6c] line-clamp-3 leading-[1.6]">
                        {article.excerpt}
                      </p>

                      {/* Article Meta */}
                      <div className="flex items-center gap-[16px] mt-[4px] pt-[12px] border-t border-[#EFEFEF]">
                        <div className="flex items-center gap-[6px] text-[var(--text-xs)] text-[#727272]">
                          <Clock className="w-[14px] h-[14px]" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center gap-[6px] text-[var(--text-xs)] text-[#727272]">
                          <TrendingUp className="w-[14px] h-[14px]" />
                          <span>{article.views} views</span>
                        </div>
                      </div>

                      {/* Article Date */}
                      <div className="text-[var(--text-xs)] text-[#727272]">
                        {article.date}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Show More Button */}
              {subcategory.articles.length >= 6 && (
                <div className="mt-[16px] text-center">
                  <button className="text-[var(--text-sm)] text-primary font-[var(--font-weight-medium)] hover:underline">
                    Lihat Semua Artikel di {subcategory.name}
                  </button>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Empty State */}
        {category.subcategories.length === 0 && (
          <div className="bg-white rounded-[8px] border border-[#ADADAD] p-[48px] text-center">
            <AlertCircle className="w-[48px] h-[48px] text-[#727272] mx-auto mb-[16px]" />
            <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-[#323232] mb-[8px]">
              Belum Ada Konten
            </h3>
            <p className="text-[var(--text-sm)] text-[#656a6c]">
              Konten untuk kategori ini sedang dalam persiapan. Silakan kembali lagi nanti.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}