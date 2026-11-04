import { Header } from "@/app/components/Header";
import { ChevronRight, ChevronDown, ChevronUp, Star, Bookmark, Clock, Eye, ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Article {
  id: string;
  title: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ArtikelDetailProps {
  article: {
    title: string;
    updateDate: string;
    content: {
      sections: {
        subtitle: string;
        paragraphs: string[];
      }[];
    };
    relatedArticles: Article[];
    featuredArticles: Article[];
    faqs: FAQItem[];
  };
  categoryName: string;
  onBack: () => void;
  onBackToPusatInformasi: () => void;
  onBackToCategory: () => void;
  onNavigateToPusatBantuan?: () => void;
}

// Utility function to truncate title if more than 4 words
const truncateTitle = (title: string): string => {
  const words = title.split(" ");
  if (words.length > 4) {
    return words.slice(0, 4).join(" ") + "...";
  }
  return title;
};

export function ArtikelDetail({
  article,
  categoryName,
  onBack,
  onBackToPusatInformasi,
  onBackToCategory,
  onNavigateToPusatBantuan,
}: ArtikelDetailProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedbackForm, setShowFeedbackForm] = useState<boolean>(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [viewCount, setViewCount] = useState<number>(1234);

  // Load data from localStorage
  useEffect(() => {
    const articleId = `article-${article.title}`;
    
    // Load rating
    const savedRatings = localStorage.getItem('articleRatings');
    if (savedRatings) {
      const ratings = JSON.parse(savedRatings);
      if (ratings[articleId]) {
        setRating(ratings[articleId].avgRating || 0);
        setTotalRatings(ratings[articleId].totalRatings || 0);
        setUserRating(ratings[articleId].userRating || 0);
      }
    }
    
    // Load bookmark status
    const savedBookmarks = localStorage.getItem('bookmarkedArticles');
    if (savedBookmarks) {
      const bookmarks = JSON.parse(savedBookmarks);
      setIsBookmarked(bookmarks.includes(articleId));
    }
    
    // Save to reading history
    const savedHistory = localStorage.getItem('readingHistory');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    const newHistoryItem = {
      id: articleId,
      title: article.title,
      category: categoryName,
      timestamp: new Date().toISOString()
    };
    
    // Remove duplicate and add to front
    const filteredHistory = history.filter((item: any) => item.id !== articleId);
    const updatedHistory = [newHistoryItem, ...filteredHistory].slice(0, 20); // Keep last 20
    localStorage.setItem('readingHistory', JSON.stringify(updatedHistory));
    
    // Load feedback status
    const savedFeedback = localStorage.getItem('articleFeedback');
    if (savedFeedback) {
      const feedbacks = JSON.parse(savedFeedback);
      if (feedbacks[articleId]) {
        setFeedbackSubmitted(true);
      }
    }
  }, [article.title, categoryName]);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleRating = (selectedRating: number) => {
    const articleId = `article-${article.title}`;
    const savedRatings = localStorage.getItem('articleRatings');
    const ratings = savedRatings ? JSON.parse(savedRatings) : {};
    
    const currentData = ratings[articleId] || { avgRating: 0, totalRatings: 0, userRating: 0, sum: 0 };
    
    // Remove previous user rating if exists
    let newSum = currentData.sum || (currentData.avgRating * currentData.totalRatings);
    let newTotal = currentData.totalRatings;
    
    if (currentData.userRating > 0) {
      newSum -= currentData.userRating;
      newTotal -= 1;
    }
    
    // Add new rating
    newSum += selectedRating;
    newTotal += 1;
    
    const newAvgRating = newSum / newTotal;
    
    ratings[articleId] = {
      avgRating: newAvgRating,
      totalRatings: newTotal,
      userRating: selectedRating,
      sum: newSum
    };
    
    localStorage.setItem('articleRatings', JSON.stringify(ratings));
    
    setRating(newAvgRating);
    setTotalRatings(newTotal);
    setUserRating(selectedRating);
  };

  const handleBookmark = () => {
    const articleId = `article-${article.title}`;
    const savedBookmarks = localStorage.getItem('bookmarkedArticles');
    const bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];
    
    if (isBookmarked) {
      // Remove bookmark
      const updated = bookmarks.filter((id: string) => id !== articleId);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(updated));
      setIsBookmarked(false);
    } else {
      // Add bookmark
      bookmarks.push(articleId);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) return;
    
    const articleId = `article-${article.title}`;
    const savedFeedback = localStorage.getItem('articleFeedback');
    const feedbacks = savedFeedback ? JSON.parse(savedFeedback) : {};
    
    feedbacks[articleId] = {
      feedback: feedback,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('articleFeedback', JSON.stringify(feedbacks));
    setFeedbackSubmitted(true);
    setShowFeedbackForm(false);
    setFeedback('');
  };

  // Get recommended articles based on reading history
  const getRecommendedArticles = () => {
    const savedHistory = localStorage.getItem('readingHistory');
    if (!savedHistory) return [];
    
    const history = JSON.parse(savedHistory);
    const categoryCount: Record<string, number> = {};
    
    // Count categories from history
    history.forEach((item: any) => {
      if (item.category && item.category !== categoryName) {
        categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
      }
    });
    
    // Get most frequent category
    const topCategory = Object.keys(categoryCount).sort((a, b) => categoryCount[b] - categoryCount[a])[0];
    
    return [
      { id: 'rec-1', title: 'Tunjangan Kinerja (Tukin)', category: topCategory || 'Kepegawaian' },
      { id: 'rec-2', title: 'Cara Akses Slip Gaji Digital', category: topCategory || 'Kepegawaian' },
      { id: 'rec-3', title: 'Syarat Kenaikan Pangkat', category: topCategory || 'Kepegawaian' }
    ];
  };

  const recommendedArticles = getRecommendedArticles();

  return (
    <div className="size-full bg-background">
      <Header onLogoClick={onBack} />

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-[1280px] mx-auto px-[24px] py-[16px]">
          <div className="flex items-center gap-[8px] text-[var(--text-sm)]">
            <button
              onClick={onBack}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Beranda
            </button>
            <ChevronRight className="w-[16px] h-[16px] text-border" />
            <button
              onClick={onBackToPusatInformasi}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Pusat Informasi
            </button>
            <ChevronRight className="w-[16px] h-[16px] text-border" />
            <button
              onClick={onBackToCategory}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {categoryName}
            </button>
            <ChevronRight className="w-[16px] h-[16px] text-border" />
            <span className="text-foreground font-[var(--font-weight-medium)]">
              {truncateTitle(article.title)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-[24px] py-[32px]">
        <div className="grid grid-cols-[1fr_320px] gap-[32px]">
          {/* Left Content */}
          <div className="flex flex-col gap-[32px]">
            {/* Article Header */}
            <div className="flex flex-col gap-[12px]">
              <h1 className="text-foreground">{article.title}</h1>
              
              {/* Article Meta */}
              <div className="flex items-center gap-[16px] flex-wrap">
                <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-muted-foreground">
                  <Clock className="w-[16px] h-[16px]" />
                  <span>{article.updateDate}</span>
                </div>
                <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-muted-foreground">
                  <Eye className="w-[16px] h-[16px]" />
                  <span>{viewCount.toLocaleString()} views</span>
                </div>
                {rating > 0 && (
                  <div className="flex items-center gap-[6px] text-[var(--text-sm)] text-muted-foreground">
                    <Star className="w-[16px] h-[16px] fill-sd-warning-border text-sd-warning-border" />
                    <span>{rating.toFixed(1)} ({totalRatings} rating{totalRatings !== 1 ? 's' : ''})</span>
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-[12px] pt-[12px]">
                <button
                  onClick={handleBookmark}
                  className={`flex items-center gap-[8px] px-[16px] py-[8px] rounded-[var(--radius-button)] border transition-all ${
                    isBookmarked
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-foreground border-border hover:bg-muted'
                  }`}
                >
                  <Bookmark className={`w-[16px] h-[16px] ${isBookmarked ? 'fill-current' : ''}`} />
                  <span className="text-[var(--text-sm)] font-[var(--font-weight-medium)]">
                    {isBookmarked ? 'Tersimpan' : 'Simpan'}
                  </span>
                </button>
                
                <button className="flex items-center gap-[8px] px-[16px] py-[8px] rounded-[var(--radius-button)] border border-border bg-card hover:bg-muted transition-colors">
                  <Share2 className="w-[16px] h-[16px]" />
                  <span className="text-[var(--text-sm)] font-[var(--font-weight-medium)]">Bagikan</span>
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-card rounded-[var(--radius-card)] border border-border p-[32px]">
              <div className="flex flex-col gap-[24px]">
                {article.content.sections.map((section, index) => (
                  <div key={index} className="flex flex-col gap-[16px]">
                    <h3 className="text-foreground">{section.subtitle}</h3>
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-foreground whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Section */}
            <div className="bg-card rounded-[var(--radius-card)] border border-border p-[24px]">
              <h3 className="text-foreground mb-[16px]">Beri Rating untuk Artikel Ini</h3>
              <div className="flex items-center gap-[12px] mb-[16px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-[32px] h-[32px] ${
                        star <= userRating
                          ? 'fill-sd-warning-border text-sd-warning-border'
                          : 'text-border hover:text-sd-warning-border'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {userRating > 0 && (
                <p className="text-[var(--text-sm)] text-muted-foreground">
                  Terima kasih atas rating Anda! ({userRating} bintang)
                </p>
              )}
              {rating > 0 && (
                <div className="mt-[12px] pt-[12px] border-t border-border">
                  <p className="text-[var(--text-sm)] text-muted-foreground">
                    Rating rata-rata: <span className="font-[var(--font-weight-medium)] text-foreground">{rating.toFixed(1)}/5</span> dari {totalRatings} pengguna
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Section */}
            <div className="flex flex-col gap-[20px]">
              <h2 className="text-foreground">Pertanyaan yang Sering Diajukan</h2>
              <div className="flex flex-col gap-[12px]">
                {article.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-[var(--radius-card)] border border-border overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-[24px] py-[16px] flex items-center justify-between gap-[16px] hover:bg-muted transition-colors text-left"
                    >
                      <span className="text-[var(--text-base)] font-[var(--font-weight-medium)] text-foreground">
                        {faq.question}
                      </span>
                      {expandedFAQ === index ? (
                        <ChevronUp className="w-[20px] h-[20px] text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronDown className="w-[20px] h-[20px] text-muted-foreground shrink-0" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-[24px] pb-[16px] pt-[8px] border-t border-border">
                        <p className="text-foreground">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Section */}
            <div className="bg-card rounded-[var(--radius-card)] border border-border p-[24px]">
              <div className="flex items-center gap-[12px] mb-[16px]">
                <MessageSquare className="w-[24px] h-[24px] text-primary" />
                <h3 className="text-foreground">Feedback Anda</h3>
              </div>
              
              {feedbackSubmitted ? (
                <div className="bg-muted rounded-[var(--radius)] p-[16px]">
                  <div className="flex items-center gap-[8px] text-primary mb-[8px]">
                    <ThumbsUp className="w-[20px] h-[20px]" />
                    <p className="text-[var(--text-base)] font-[var(--font-weight-medium)]">
                      Terima kasih atas feedback Anda!
                    </p>
                  </div>
                  <p className="text-[var(--text-sm)] text-muted-foreground">
                    Masukan Anda sangat membantu kami untuk terus meningkatkan kualitas artikel.
                  </p>
                </div>
              ) : showFeedbackForm ? (
                <div className="flex flex-col gap-[12px]">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Bagikan pengalaman Anda dengan artikel ini, atau sarankan perbaikan..."
                    className="w-full min-h-[120px] p-[12px] border border-sd-gray-50 rounded-[4px] text-[var(--text-sm)] text-foreground placeholder:text-muted-foreground resize-none bg-white outline-none transition-shadow focus:border-sd-blue-50 focus:shadow-[0_0_0_2px_var(--sd-interactive-focused)]"
                  />
                  <div className="flex items-center gap-[12px]">
                    <button
                      onClick={handleFeedbackSubmit}
                      disabled={!feedback.trim()}
                      className="px-[20px] py-[10px] bg-primary text-primary-foreground rounded-[var(--radius-button)] font-[var(--font-weight-medium)] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kirim Feedback
                    </button>
                    <button
                      onClick={() => {
                        setShowFeedbackForm(false);
                        setFeedback('');
                      }}
                      className="px-[20px] py-[10px] bg-card border border-border text-foreground rounded-[var(--radius-button)] font-[var(--font-weight-medium)] hover:bg-muted transition-colors"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowFeedbackForm(true)}
                  className="w-full px-[20px] py-[12px] bg-muted text-foreground rounded-[var(--radius)] font-[var(--font-weight-medium)] hover:bg-border transition-colors text-left"
                >
                  Klik untuk memberikan feedback atau saran...
                </button>
              )}
            </div>

            {/* CTA Section */}
            <div className="bg-primary rounded-[var(--radius-card)] p-[32px] flex flex-col gap-[16px] items-center text-center">
              <h3 className="text-primary-foreground">
                Masih Membutuhkan Bantuan?
              </h3>
              <p className="text-primary-foreground opacity-90">
                Tim dukungan kami siap membantu Anda dengan pertanyaan lebih lanjut
              </p>
              <button
                onClick={onNavigateToPusatBantuan || onBackToPusatInformasi}
                className="bg-card text-primary px-[24px] py-[12px] rounded-[var(--radius-button)] font-[var(--font-weight-medium)] hover:bg-card/90 transition-colors"
              >
                Kunjungi Pusat Bantuan
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-[24px]">
            {/* Related Articles */}
            <div className="bg-card rounded-[var(--radius-card)] border border-border p-[20px] flex flex-col gap-[16px]">
              <h4 className="text-foreground">Artikel Terkait</h4>
              <div className="flex flex-col gap-[12px]">
                {article.relatedArticles.map((relatedArticle) => (
                  <button
                    key={relatedArticle.id}
                    className="text-left text-[var(--text-sm)] text-primary hover:underline"
                  >
                    {relatedArticle.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommended for You */}
            {recommendedArticles.length > 0 && (
              <div className="bg-card rounded-[var(--radius-card)] border border-border p-[20px] flex flex-col gap-[16px]">
                <div className="flex items-center gap-[8px]">
                  <Star className="w-[18px] h-[18px] text-primary" />
                  <h4 className="text-foreground">Direkomendasikan untuk Anda</h4>
                </div>
                <div className="flex flex-col gap-[12px]">
                  {recommendedArticles.map((recArticle) => (
                    <div key={recArticle.id} className="flex flex-col gap-[4px]">
                      <button className="text-left text-[var(--text-sm)] text-primary hover:underline">
                        {recArticle.title}
                      </button>
                      <span className="text-[var(--text-xs)] text-muted-foreground">{recArticle.category}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[var(--text-xs)] text-muted-foreground italic">
                  Berdasarkan riwayat bacaan Anda
                </p>
              </div>
            )}

            {/* Featured Articles */}
            <div className="bg-card rounded-[var(--radius-card)] border border-border p-[20px] flex flex-col gap-[16px]">
              <h4 className="text-foreground">Artikel Pilihan</h4>
              <div className="flex flex-col gap-[12px]">
                {article.featuredArticles.map((featuredArticle) => (
                  <button
                    key={featuredArticle.id}
                    className="text-left text-[var(--text-sm)] text-primary hover:underline"
                  >
                    {featuredArticle.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}