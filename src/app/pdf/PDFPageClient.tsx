// src/app/pdf/PDFPageClient.tsx
'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Filter from '../components/Filter';
import PDF from '../components/Cards/PDF';
import Heading from '../components/Heading';
import { getPaginatedPDFs } from '@/lib/sanity/queries';
import Loader2 from "../components/Loader2";

interface PDFPageProps {
  initialPDFs: any[];
  writers: string[];
  genres: string[];
  totalPDFCount: number;
}

export default function PDFPageClient({
  initialPDFs,
  writers,
  genres,
  totalPDFCount
}: PDFPageProps) {
  const [filters, setFilters] = useState({
    selectedWriter: '',
    selectedSort: '',
    selectedGenres: [] as string[],
    youtubeOnly: false,
  });
  const [allLoadedPDFs, setAllLoadedPDFs] = useState<any[]>(initialPDFs || []);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const isLoadingRef = useRef(false);

  // Fetch more PDFs when needed
  const loadMorePDFs = useCallback(async () => {
    if (isLoadingRef.current || !hasMore || filters.selectedSort) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const nextPage = currentPage + 1;
      const morePDFs = await getPaginatedPDFs(nextPage, 20);

      if (!morePDFs || morePDFs.length === 0) {
        setHasMore(false);
        setShowLoadMore(false);
      } else {
        const sanitizedPDFs = morePDFs.filter(
          (pdf: any) => pdf && pdf._id
        );
        setAllLoadedPDFs(prev => [...prev, ...sanitizedPDFs]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error('Error loading more PDFs:', error);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [currentPage, hasMore, filters.selectedSort]);

  // Reset data when filters change
  useEffect(() => {
    const sanitizedInitialPDFs = Array.isArray(initialPDFs)
      ? initialPDFs.filter((pdf) => pdf && pdf._id)
      : [];

    if (filters.selectedSort) {
      // For special sorts, only show top 4 from initial data
      setAllLoadedPDFs(sanitizedInitialPDFs);
      setHasMore(false);
      setShowLoadMore(false);
    } else {
      // For default view, reset pagination
      setAllLoadedPDFs(sanitizedInitialPDFs);
      setCurrentPage(0);
      setHasMore(true);
      setShowLoadMore(true);
    }
  }, [filters.selectedSort, initialPDFs]);

  // Client-side filtering with useMemo for performance
  const filteredPDFs = useMemo(() => {
    let result = [...allLoadedPDFs].filter((pdf) => pdf && pdf._id); // Filter out null/undefined PDFs

    // Apply writer filter
    if (filters.selectedWriter) {
      result = result.filter(
        (pdf) => pdf && pdf.writer?.writername === filters.selectedWriter
      );
    }

    // Apply genre filters
    if (filters.selectedGenres.length > 0) {
      result = result.filter(
        (pdf) =>
          pdf && filters.selectedGenres.includes(pdf.genre?.genrename)
      );
    }

    // Apply YouTube-only filter
    if (filters.youtubeOnly) {
      result = result.filter(
        (pdf) => pdf && pdf.youtubeurl && pdf.youtubeurl.trim() !== ""
      );
    }

    // Apply sorting
    switch (filters.selectedSort) {
      case 'Latest':
        result = result
          .sort(
            (a, b) =>
              new Date(b._createdAt).getTime() -
              new Date(a._createdAt).getTime()
          )
          .slice(0, 4);
        break;
      case 'Popular':
        result = result
          .sort((a, b) => (b.totalViews || 0) - (a.totalViews || 0))
          .slice(0, 4);
        break;
      case 'Trending':
        result = result
          .sort(
            (a, b) => (b.totalMonthlyViews || 0) - (a.totalMonthlyViews || 0)
          )
          .slice(0, 4);
        break;
      default:
        result = result.sort(
          (a, b) =>
            new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
        );
    }

    return result;
  }, [allLoadedPDFs, filters]);

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  // Handle scroll for infinite loading
  useEffect(() => {
    if (filters.selectedSort || !showLoadMore) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Load more when user scrolls near bottom
      if (
        scrollTop + windowHeight >= documentHeight - 1000 &&
        !isLoading &&
        hasMore
      ) {
        loadMorePDFs();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMorePDFs, isLoading, hasMore, filters.selectedSort, showLoadMore]);

  const handleLoadMoreClick = () => {
    loadMorePDFs();
  };

  return (
    <div className="flex flex-col gap-6 py-5 justify-center">
      {/* Hero Banner */}
      <section className="relative mx-4 lg:mx-0 rounded-3xl overflow-hidden bg-[#1E5D50] shadow-2xl">
        <div aria-hidden="true" className="absolute inset-0 -z-0">
          <div className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full bg-[#2F7565]/40 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[200px] rounded-full bg-[#C9A96E]/15 blur-3xl"></div>
        </div>
        <div className="relative text-center px-6 py-12 lg:py-16 flex flex-col items-center gap-4">
          <span className="inline-block px-5 py-2 rounded-full border-2 border-[#C9A96E]/60 text-[#C9A96E] text-sm font-bold tracking-wide uppercase">
            {totalPDFCount} PDFs
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            PDF Library
          </h1>
          <p className="mx-auto max-w-2xl text-base lg:text-lg leading-8 text-white/80">
            Complete Urdu novels available as PDF downloads. Read offline on your phone or computer.
          </p>
        </div>
      </section>

      {/* Filter Section — matches homepage style */}
      <section className="py-2 bg-[#FAF7F2] rounded-3xl mx-4 lg:mx-0 px-6 py-8">
        <Heading name="Browse PDFs" />
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-4 pt-4">
          <p className="text-center leading-7 font-medium">
            Filter PDF novels by writer and genre. Choose your options and press Apply filter.
          </p>
          <Filter
            dropdowns={[
              {
                label: "Writers",
                options: writers,
                value: filters.selectedWriter,
                onChange: (value: any) =>
                  handleFilterChange({
                    ...filters,
                    selectedWriter: value,
                  }),
              },
              {
                label: "Sort By",
                options: ["Latest", "Trending", "Popular"],
                value: filters.selectedSort,
                onChange: (value: any) =>
                  handleFilterChange({
                    ...filters,
                    selectedSort: value,
                  }),
              },
            ]}
            checkboxes={genres.map((genre) => ({
              label: genre,
              checked: filters.selectedGenres.includes(genre),
              onChange: (checked: any) => {
                const newGenres = checked
                  ? [...filters.selectedGenres, genre]
                  : filters.selectedGenres.filter((g) => g !== genre);

                handleFilterChange({
                  ...filters,
                  selectedGenres: newGenres,
                });
              },
            }))}
            toggle={{
              label: "YouTube PDFs",
              value: filters.youtubeOnly,
              onChange: (value: boolean) =>
                handleFilterChange({ ...filters, youtubeOnly: value }),
            }}
            onclick={() => {}}
          />
          {(filters.selectedWriter || filters.selectedSort || filters.selectedGenres.length > 0 || filters.youtubeOnly) && (
            <button
              onClick={() => handleFilterChange({ selectedWriter: "", selectedSort: "", selectedGenres: [], youtubeOnly: false })}
              className="border-2 border-[#DCCFC2] text-[#111111] font-bold px-6 py-2 text-sm rounded-full hover:border-[#1E5D50] hover:text-[#1E5D50] hover:shadow-[0_0_12px_rgba(30,93,80,0.15)] active:scale-95 transition-all duration-300"
            >
              Clear Filters
            </button>
          )}
        </div>
      </section>

      {/* PDF Grid */}
      <ul className="flex flex-wrap gap-5 justify-center lg:justify-start lg:px-4">
        {filteredPDFs
          .filter((pdf) => pdf && pdf._id)
          .map((pdf, index) => (
            <PDF
              key={`${pdf._id}-${index}`}
              date={
                pdf.pdfreleasedate
                  ? new Date(pdf.pdfreleasedate).toLocaleDateString("en-GB")
                  : ""
              }
              href={
                pdf?.slug?.current ? pdf.slug.current : "unknown"
              }
              cardBanner={pdf.banner || "https://res.cloudinary.com/dx1gryhqc/image/upload/v1759093412/humaqureshi_writerbanner_ajh5nx.png"}
              novelName={pdf.title || ""}
              writer={pdf.writer?.writername || ""}
              genre={pdf.genre?.genrename || ""}
              summary={pdf.summary || ""}
            />
          ))}
      </ul>

      {/* Load More */}
      {filters.selectedSort === "" && showLoadMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMoreClick}
            disabled={isLoading}
            className="bg-[#1E5D50] text-white font-bold px-8 py-3 rounded-full hover:bg-[#16483E] active:scale-95 transition shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2"><Loader2 /> Loading...</span>
            ) : (
              "Load More PDFs"
            )}
          </button>
        </div>
      )}

      {/* End of list */}
      {!hasMore && !isLoading && filters.selectedSort === "" && (
        <div className="text-center py-6 font-bold text-[#1E5D50]">
          You&apos;ve reached the end of the list
        </div>
      )}
    </div>
  );
}