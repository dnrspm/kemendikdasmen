import { Search, FileText, BookOpen, Users, Settings, HelpCircle, ExternalLink, ChevronDown, ChevronRight, Home, Clock, FolderOpen, Video, Mail, FileSpreadsheet, Presentation, Database, TrendingUp, Star, Filter, X } from 'lucide-react';
import { Header } from "@/app/components/Header";
import { useState, useMemo, useEffect } from 'react';

interface PusatInformasiProps {
  onBack: () => void;
  onNavigateToPusatBantuan?: () => void;
  onNavigateToKategori?: (categoryTitle: string) => void;
  onNavigateToOrganizations?: () => void;
  onNavigateToAnalytics?: (orgId: string) => void;
  onNavigateToLayanan?: () => void;
  onNavigateToRepositoriSurat?: () => void;
  onNavigateToProjectManagement?: (orgId?: string) => void;
  onNavigateToPemberitahuan?: () => void;
}

export function PusatInformasi({ onBack, onNavigateToPusatBantuan, onNavigateToKategori, onNavigateToPemberitahuan }: PusatInformasiProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [faqVotes, setFaqVotes] = useState<Record<number, { helpful: number; notHelpful: number; userVote?: 'up' | 'down' }>>({});

  // Load FAQ votes from localStorage
  useEffect(() => {
    const savedVotes = localStorage.getItem('faqVotes');
    if (savedVotes) {
      setFaqVotes(JSON.parse(savedVotes));
    }
  }, []);

  // Save FAQ votes to localStorage
  const handleFaqVote = (index: number, vote: 'up' | 'down') => {
    setFaqVotes(prev => {
      const current = prev[index] || { helpful: 0, notHelpful: 0 };
      const userVoted = current.userVote;
      
      let newVotes = { ...current };
      
      if (userVoted === vote) {
        // Remove vote
        if (vote === 'up') {
          newVotes.helpful = Math.max(0, newVotes.helpful - 1);
        } else {
          newVotes.notHelpful = Math.max(0, newVotes.notHelpful - 1);
        }
        delete newVotes.userVote;
      } else {
        // Add or change vote
        if (userVoted) {
          // Remove previous vote
          if (userVoted === 'up') {
            newVotes.helpful = Math.max(0, newVotes.helpful - 1);
          } else {
            newVotes.notHelpful = Math.max(0, newVotes.notHelpful - 1);
          }
        }
        // Add new vote
        if (vote === 'up') {
          newVotes.helpful = (newVotes.helpful || 0) + 1;
        } else {
          newVotes.notHelpful = (newVotes.notHelpful || 0) + 1;
        }
        newVotes.userVote = vote;
      }
      
      const updated = { ...prev, [index]: newVotes };
      localStorage.setItem('faqVotes', JSON.stringify(updated));
      return updated;
    });
  };

  const categories = [
    {
      icon: Users,
      title: 'Kepegawaian',
      description: 'Informasi kepegawaian dan administrasi',
      color: 'var(--sd-blue-70)',
      articleCount: 15,
      isNew: false
    },
    {
      icon: Database,
      title: 'SINDE',
      description: 'Sistem Informasi Data Pendidikan',
      color: 'var(--sd-success-border)',
      articleCount: 8,
      isNew: true
    },
    {
      icon: Clock,
      title: 'Kehadiran',
      description: 'Kelola presensi dan kehadiran',
      color: '#906CEF',
      articleCount: 12,
      isNew: false
    },
    {
      icon: FileText,
      title: 'Kinerja',
      description: 'Penilaian dan evaluasi kinerja',
      color: 'var(--sd-warning-border)',
      articleCount: 10,
      isNew: false
    },
    {
      icon: BookOpen,
      title: 'Layanan',
      description: 'Akses berbagai layanan administrasi',
      color: 'var(--sd-red-60)',
      articleCount: 21,
      isNew: false
    },
    {
      icon: Settings,
      title: 'Wiyata Kinarya',
      description: 'Sistem manajemen kinerja',
      color: 'var(--sd-blue-70)',
      articleCount: 9,
      isNew: false
    },
    {
      icon: FileText,
      title: 'Agenda',
      description: 'Jadwal dan kalender kegiatan',
      color: 'var(--sd-success-border)',
      articleCount: 6,
      isNew: false
    },
    {
      icon: FolderOpen,
      title: 'Penyimpanan Elektronik',
      description: 'Dokumen dan file digital',
      color: '#906CEF',
      articleCount: 5,
      isNew: false
    },
    {
      icon: Video,
      title: 'Konferensi Video',
      description: 'Rapat dan pertemuan online',
      color: 'var(--sd-warning-border)',
      articleCount: 4,
      isNew: true
    },
    {
      icon: FileText,
      title: 'Dasbor Kunjungan Kerja',
      description: 'Laporan kunjungan kerja',
      color: 'var(--sd-red-60)',
      articleCount: 3,
      isNew: false
    },
    {
      icon: Mail,
      title: 'Email Kemendikdasmen',
      description: 'Email resmi kementerian',
      color: 'var(--sd-blue-70)',
      articleCount: 11,
      isNew: false
    },
    {
      icon: FileText,
      title: 'Dokumen Kolaborasi',
      description: 'Kolaborasi dokumen tim',
      color: 'var(--sd-success-border)',
      articleCount: 8,
      isNew: false
    },
    {
      icon: FileSpreadsheet,
      title: 'Spreadsheet Kolaborasi',
      description: 'Kolaborasi spreadsheet tim',
      color: '#906CEF',
      articleCount: 6,
      isNew: false
    },
    {
      icon: Presentation,
      title: 'Presentasi Kolaborasi',
      description: 'Kolaborasi presentasi tim',
      color: 'var(--sd-warning-border)',
      articleCount: 5,
      isNew: false
    },
    {
      icon: Settings,
      title: 'Pengaturan Umum',
      description: 'Konfigurasi sistem umum',
      color: 'var(--sd-red-60)',
      articleCount: 7,
      isNew: false
    }
  ];

  // Trending/Popular articles
  const trendingArticles = [
    {
      id: 'trending-1',
      title: 'Cara Mengajukan Cuti Tahunan',
      category: 'Kepegawaian',
      views: 3421,
      categoryColor: 'var(--sd-blue-70)'
    },
    {
      id: 'trending-2',
      title: 'Komponen Gaji Pegawai',
      category: 'Kepegawaian',
      views: 2876,
      categoryColor: 'var(--sd-blue-70)'
    },
    {
      id: 'trending-3',
      title: 'Cara Melakukan Presensi',
      category: 'Kehadiran',
      views: 2543,
      categoryColor: '#906CEF'
    },
    {
      id: 'trending-4',
      title: 'Cara Login ke Sistem SINDE',
      category: 'SINDE',
      views: 2103,
      categoryColor: 'var(--sd-success-border)'
    },
    {
      id: 'trending-5',
      title: 'Tunjangan Kinerja (Tukin)',
      category: 'Kepegawaian',
      views: 1987,
      categoryColor: 'var(--sd-blue-70)'
    }
  ];

  const faqs = [
    {
      question: 'Bagaimana cara mengajukan cuti tahunan?',
      answer: 'Anda dapat mengajukan cuti tahunan melalui menu Kepegawaian > Permohonan Cuti. Pastikan saldo cuti Anda mencukupi dan ajukan minimal 3 hari sebelum tanggal cuti.',
      tags: ['cuti', 'kepegawaian']
    },
    {
      question: 'Bagaimana cara mengisi log harian?',
      answer: 'Log harian dapat diisi melalui menu Kinerja > Log Harian. Isi kegiatan yang Anda lakukan setiap hari dengan detail yang jelas.',
      tags: ['kinerja', 'log']
    },
    {
      question: 'Siapa yang dapat mengakses data presensi saya?',
      answer: 'Data presensi hanya dapat diakses oleh Anda, atasan langsung, dan tim HR untuk keperluan administrasi kepegawaian.',
      tags: ['presensi', 'kehadiran', 'privasi']
    },
    {
      question: 'Bagaimana cara mengubah data profil?',
      answer: 'Untuk mengubah data profil, klik nama Anda di pojok kanan atas, pilih Pengaturan Profil, dan perbarui informasi yang diperlukan.',
      tags: ['profil', 'pengaturan']
    },
    {
      question: 'Apa yang harus dilakukan jika lupa password?',
      answer: 'Klik "Lupa Password" di halaman login, masukkan email terdaftar, dan ikuti instruksi yang dikirimkan ke email Anda.',
      tags: ['password', 'login', 'akun']
    }
  ];

  // Filter categories based on search and filter
  const filteredCategories = useMemo(() => {
    let filtered = categories;
    
    if (searchQuery) {
      filtered = filtered.filter(cat => 
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'new') {
        filtered = filtered.filter(cat => cat.isNew);
      }
    }
    
    return filtered;
  }, [searchQuery, selectedFilter]);

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    const suggestions = [];
    
    // Add category matches
    categories.forEach(cat => {
      if (cat.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.push({
          type: 'category' as const,
          title: cat.title,
          icon: cat.icon,
          color: cat.color
        });
      }
    });
    
    // Add FAQ matches
    faqs.forEach((faq, index) => {
      if (faq.question.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.push({
          type: 'faq' as const,
          title: faq.question,
          index
        });
      }
    });
    
    return suggestions.slice(0, 5);
  }, [searchQuery]);

  // Filter FAQs based on search
  const filteredFaqs = useMemo(() => {
    if (!faqSearchQuery) return faqs;
    
    return faqs.filter(faq =>
      faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(faqSearchQuery.toLowerCase()))
    );
  }, [faqSearchQuery]);

  return (
    <div className="bg-sd-gray-0 min-h-screen w-full">
      {/* Navigation Header */}
      <Header onLogoClick={onBack} onNotificationViewAll={onNavigateToPemberitahuan} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-sd-badge-neutral">
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
            <span className="text-[var(--text-sm)] text-foreground font-[var(--font-weight-medium)]">
              Pusat Informasi
            </span>
          </nav>
        </div>
      </div>

      {/* Page Title */}
      <div className="bg-white border-b border-sd-badge-neutral">
        <div className="max-w-[1280px] mx-auto px-[24px] py-[24px]">
          <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[24px]">
            Pusat Informasi
          </h1>
          
          {/* Search Bar with Suggestions */}
          <div className="relative">
            <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-sd-gray-60 z-10" />
            <input
              type="text"
              placeholder="Cari informasi, panduan, atau FAQ..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full h-[48px] pl-[48px] pr-[100px] border border-sd-gray-50 rounded-[4px] text-[15px] text-sd-gray-90 placeholder:text-sd-gray-60 bg-white outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
            />
            
            {/* Clear button */}
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
                className="absolute right-[90px] top-1/2 -translate-y-1/2 text-sd-gray-60 hover:text-foreground transition-colors"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            )}
            
            {/* Filter Button */}
            <div className="absolute right-[16px] top-1/2 -translate-y-1/2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="h-[32px] px-[12px] border border-sd-gray-50 rounded-[4px] text-[var(--text-sm)] text-foreground bg-white cursor-pointer outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
              >
                <option value="all">Semua</option>
                <option value="new">Terbaru</option>
              </select>
            </div>
            
            {/* Search Suggestions Dropdown */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-[8px] bg-white border border-sd-gray-30 rounded-[var(--radius-card)] shadow-lg z-50 max-h-[300px] overflow-y-auto">
                {searchSuggestions.map((suggestion, index) => {
                  if (suggestion.type === 'category') {
                    const IconComponent = suggestion.icon;
                    return (
                      <button
                        key={`cat-${index}`}
                        className="w-full px-[16px] py-[12px] flex items-center gap-[12px] hover:bg-muted transition-colors text-left border-b border-sd-badge-neutral last:border-b-0"
                        onClick={() => {
                          onNavigateToKategori && onNavigateToKategori(suggestion.title);
                          setSearchQuery('');
                          setShowSuggestions(false);
                        }}
                      >
                        <div
                          className="w-[32px] h-[32px] rounded-[6px] flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${suggestion.color}15` }}
                        >
                          <IconComponent className="w-[16px] h-[16px]" style={{ color: suggestion.color }} />
                        </div>
                        <div>
                          <p className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-foreground">
                            {suggestion.title}
                          </p>
                          <p className="text-[var(--text-xs)] text-muted-foreground">Kategori</p>
                        </div>
                      </button>
                    );
                  } else {
                    return (
                      <button
                        key={`faq-${index}`}
                        className="w-full px-[16px] py-[12px] flex items-center gap-[12px] hover:bg-muted transition-colors text-left border-b border-sd-badge-neutral last:border-b-0"
                        onClick={() => {
                          setSearchQuery('');
                          setShowSuggestions(false);
                          // Scroll to FAQ section
                          const faqSection = document.getElementById('faq-section');
                          if (faqSection) {
                            faqSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        <HelpCircle className="w-[32px] h-[32px] text-primary shrink-0" />
                        <div>
                          <p className="text-[var(--text-sm)] text-foreground line-clamp-1">
                            {suggestion.title}
                          </p>
                          <p className="text-[var(--text-xs)] text-muted-foreground">FAQ</p>
                        </div>
                      </button>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-[24px] py-[40px]">
        <div className="flex flex-col gap-[40px]">
          {/* Trending Articles Section */}
          <section>
            <div className="flex items-center gap-[12px] mb-[24px]">
              <TrendingUp className="w-[28px] h-[28px] text-sd-red-60" />
              <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90">
                Artikel Terpopuler
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
              {trendingArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="bg-white rounded-[8px] border border-sd-gray-30 p-[20px] hover:shadow-md hover:border-primary transition-all cursor-pointer group relative"
                >
                  {/* Trending Badge */}
                  {index < 3 && (
                    <div className="absolute top-[12px] right-[12px] bg-sd-red-60 text-white px-[8px] py-[4px] rounded-[4px] flex items-center gap-[4px]">
                      <TrendingUp className="w-[12px] h-[12px]" />
                      <span className="text-[var(--text-xs)] font-[var(--font-weight-medium)]">Trending</span>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-sd-gray-90 line-clamp-2 group-hover:text-primary transition-colors pr-[80px]">
                      {article.title}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-[8px] border-t border-sd-badge-neutral">
                      <div
                        className="flex items-center gap-[6px] px-[10px] py-[4px] rounded-[4px]"
                        style={{ backgroundColor: `${article.categoryColor}15` }}
                      >
                        <span className="text-[var(--text-xs)] font-[var(--font-weight-medium)]" style={{ color: article.categoryColor }}>
                          {article.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-[6px] text-[var(--text-xs)] text-sd-gray-60">
                        <TrendingUp className="w-[14px] h-[14px]" />
                        <span>{article.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Kategori Informasi */}
          <section>
            <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[24px]">
              Kategori Informasi
            </h2>
            
            {filteredCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[12px]">
                {filteredCategories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={index}
                      className="bg-white rounded-[8px] border border-sd-gray-30 p-[16px] text-left hover:shadow-md hover:scale-[1.02] transition-all relative"
                      onClick={() => onNavigateToKategori && onNavigateToKategori(category.title)}
                    >
                      {/* New Badge */}
                      {category.isNew && (
                        <div className="absolute top-[12px] right-[12px] bg-sd-success-border text-white px-[8px] py-[4px] rounded-[4px]">
                          <span className="text-[var(--text-xs)] font-[var(--font-weight-medium)]">Baru</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-[12px] mb-[8px]">
                        <div
                          className="w-[40px] h-[40px] rounded-[8px] flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${category.color}15` }}
                        >
                          <IconComponent
                            className="w-[20px] h-[20px]"
                            style={{ color: category.color }}
                          />
                        </div>
                        <p className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-sd-gray-90">
                          {category.title}
                        </p>
                      </div>
                      
                      <p className="text-[var(--text-xs)] text-sd-gray-60 mt-[8px]">
                        {category.articleCount} artikel tersedia
                      </p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[48px] text-center">
                <Search className="w-[48px] h-[48px] text-sd-gray-60 mx-auto mb-[16px]" />
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-medium)] text-sd-gray-90 mb-[8px]">
                  Tidak Ada Hasil
                </h3>
                <p className="text-[var(--text-sm)] text-sd-gray-60">
                  Coba gunakan kata kunci yang berbeda atau hapus filter
                </p>
              </div>
            )}
          </section>

          {/* FAQ Section */}
          <section id="faq-section">
            <div className="flex items-center gap-[12px] mb-[24px]">
              <HelpCircle className="w-[28px] h-[28px] text-primary" />
              <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)] text-sd-gray-90">
                Pertanyaan yang Sering Diajukan (FAQ)
              </h2>
            </div>
            
            {/* FAQ Search */}
            <div className="relative mb-[20px]">
              <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-sd-gray-60" />
              <input
                type="text"
                placeholder="Cari pertanyaan..."
                value={faqSearchQuery}
                onChange={(e) => setFaqSearchQuery(e.target.value)}
                className="w-full h-[44px] pl-[44px] pr-[16px] border border-sd-gray-50 rounded-[4px] text-[var(--text-sm)] text-sd-gray-90 placeholder:text-sd-gray-60 bg-white outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
              />
            </div>
            
            <div className="flex flex-col gap-[12px]">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => {
                  const originalIndex = faqs.indexOf(faq);
                  const votes = faqVotes[originalIndex] || { helpful: 0, notHelpful: 0 };
                  const userVote = votes.userVote;
                  
                  return (
                    <details
                      key={originalIndex}
                      className="bg-white rounded-[8px] border border-sd-gray-30 overflow-hidden group"
                    >
                      <summary className="px-[20px] py-[16px] cursor-pointer list-none hover:bg-muted transition-colors">
                        <div className="flex items-center justify-between">
                          <h3 className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-sd-gray-90">
                            {faq.question}
                          </h3>
                          <svg
                            className="w-[20px] h-[20px] text-sd-gray-60 transition-transform group-open:rotate-180 shrink-0 ml-[12px]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </summary>
                      <div className="px-[20px] pb-[16px] pt-[4px] border-t border-sd-badge-neutral">
                        <p className="text-[var(--text-sm)] text-sd-gray-60 leading-[1.6] mb-[16px]">
                          {faq.answer}
                        </p>
                        
                        {/* Helpful Vote Section */}
                        <div className="flex items-center gap-[16px] pt-[12px] border-t border-sd-badge-neutral">
                          <span className="text-[var(--text-sm)] text-sd-gray-60">Apakah jawaban ini membantu?</span>
                          <div className="flex items-center gap-[8px]">
                            <button
                              onClick={() => handleFaqVote(originalIndex, 'up')}
                              className={`flex items-center gap-[6px] px-[12px] py-[6px] rounded-[4px] border transition-all ${
                                userVote === 'up'
                                  ? 'bg-primary text-primary-foreground border-primary'
                                  : 'bg-white text-sd-gray-60 border-sd-gray-30 hover:bg-muted'
                              }`}
                            >
                              <span className="text-[15px]">👍</span>
                              <span className="text-[var(--text-sm)] font-[var(--font-weight-medium)]">
                                {votes.helpful}
                              </span>
                            </button>
                            <button
                              onClick={() => handleFaqVote(originalIndex, 'down')}
                              className={`flex items-center gap-[6px] px-[12px] py-[6px] rounded-[4px] border transition-all ${
                                userVote === 'down'
                                  ? 'bg-destructive text-destructive-foreground border-destructive'
                                  : 'bg-white text-sd-gray-60 border-sd-gray-30 hover:bg-muted'
                              }`}
                            >
                              <span className="text-[15px]">👎</span>
                              <span className="text-[var(--text-sm)] font-[var(--font-weight-medium)]">
                                {votes.notHelpful}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </details>
                  );
                })
              ) : (
                <div className="bg-white rounded-[8px] border border-sd-gray-30 p-[32px] text-center">
                  <HelpCircle className="w-[48px] h-[48px] text-sd-gray-60 mx-auto mb-[12px]" />
                  <p className="text-[var(--text-sm)] text-sd-gray-60">
                    Tidak ada FAQ yang cocok dengan pencarian Anda
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* CTA Pusat Bantuan */}
          <section className="bg-gradient-to-r from-sd-blue-70 to-[#4C8DF6] rounded-[8px] p-[32px] text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-[24px]">
              <div className="flex flex-col gap-[8px] flex-1">
                <h2 className="text-[var(--text-xl)] font-[var(--font-weight-medium)]">
                  Butuh Bantuan Lebih Lanjut?
                </h2>
                <p className="text-[var(--text-base)] opacity-90 leading-[1.5]">
                  Tim dukungan kami siap membantu Anda 24/7. Hubungi pusat bantuan untuk mendapatkan solusi cepat atas pertanyaan Anda.
                </p>
              </div>
              <button
                onClick={onNavigateToPusatBantuan}
                className="bg-white text-primary px-[24px] py-[12px] rounded-[4px] font-[var(--font-weight-medium)] text-[15px] hover:bg-muted transition-colors flex items-center gap-[8px] whitespace-nowrap"
              >
                Pusat Bantuan
                <ExternalLink className="w-[18px] h-[18px]" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}