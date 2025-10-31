"use client";
import React, { useEffect, useRef, useState } from "react";
import Heading from "../components/Heading";
import Novel from "../components/Cards/Novel";
import { client } from "@/sanity/lib/client";
import Loader from "../components/Loader";
import LoadMoreButton from "../components/LoadMoreButton";
import Loader2 from "../components/Loader2";
import Filter from "../components/Filter";

export default function Page() {
  const [allNovels, setAllNovels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(<Loader />);
  const [page, setPage] = useState(0); // page index
  const [hasMore, setHasMore] = useState(true); // check if more novels exist
  const limit = 5; // how many novels per fetch
  // filter
  const [writers, setWriters] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedWriter, setSelectedWriter] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isPremium, setIsPremium] = useState(false);

  // 1. Initialize the ref
  const isInitialMount = useRef(true);

  const fetchNovels = async (pageIndex: number) => {
    try {
      setLoading(true);
      // setAllNovels([]);
      const query = `*[_type == "novelparent" && defined(novelreleasedate) && novelreleasedate <= now()] | order(_createdAt desc) [${pageIndex * limit}...${(pageIndex + 1) * limit}] {
        title,
        cardbannerurl,
        _id, slug,
        genre->{genrename,_id},
        writer->{writername,_id},
      }`;
      console.log(pageIndex * limit, "...", (pageIndex + 1) * limit);
      const writerData = await client.fetch(`*[_type == "writer"]{writername}`);
      const genreData = await client.fetch(`*[_type == "genre"]{genrename}`);
      setWriters(writerData.map((w: { writername: string }) => w.writername));
      setGenres(genreData.map((g: { genrename: string }) => g.genrename));

      const response = await client.fetch(query);

      if (response.length < limit) {
        setHasMore(false); // no more novels left
      }

      setAllNovels((prev) => [...prev, ...response]);
    } catch (error) {
      console.error("Error fetching novels:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchNovels(page);
  //   if (page > 0) setLoader(<Loader2 />);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page]);

  const handleApplyFilters = async (pageIndex: number = 0) => {
    setLoading(true);
    setHasMore(true);
    // setAllNovels([]);
    try {
      const filters: string[] = [];

      // Writer filter
      if (selectedWriter) {
        filters.push(`writer->writername == "${selectedWriter}"`);
      }

      // Genres filter
      if (selectedGenres.length > 0) {
        const genresStr = selectedGenres.map((g) => `"${g}"`).join(", ");
        // console.log(genresStr, "-------------------------------");
        filters.push(`genre->genrename in [${genresStr}]`);
      }

      // Premium filter
      if (isPremium) {
        filters.push(`isPremium == true`);
      }

      // Boolean filters for sorting
      if (selectedSort === "Latest") filters.push(`latest == true`);
      if (selectedSort === "Trending") filters.push(`trending == true`);
      if (selectedSort === "Popular") filters.push(`popular == true`);

      // Build GROQ query
      let filterQuery = `*[_type == "novelparent" && defined(novelreleasedate) && novelreleasedate <= now()`;
      if (filters.length > 0) {
        filterQuery += ` && ${filters.join(" && ")}`;
      }

      filterQuery += `] | order(_createdAt desc) [${pageIndex * limit}...${(pageIndex + 1) * limit}] {
      title,
      cardbannerurl,
      _id,
      slug,
      genre->{genrename},
      writer->{writername},
      trending,
      popular,
      latest
    }`;
      // console.log(filterQuery, "query");
      const filteredResults = await client.fetch(filterQuery);
      console.log(pageIndex * limit, "...", (pageIndex + 1) * limit);

      if (filteredResults.length < limit) {
        setHasMore(false); // no more novels left
      } else {
        setHasMore(true);
      }
      setAllNovels((prev) => [...prev, ...filteredResults]);
      // allNovels.map((i, g) => console.log(g, i.title, i.genre.genrename));
    } catch (err) {
      console.error("Error applying filters:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if it's the initial mount
    if (isInitialMount.current) {
      // Set the ref to false for future renders
      isInitialMount.current = false;
      // Fetch initial data on first mount *outside* this specific useEffect
      fetchNovels(0);
    } else {
      // This runs on subsequent renders when 'page' changes
      if (
        selectedWriter ||
        selectedSort ||
        selectedGenres.length > 0 ||
        isPremium
      ) {
        handleApplyFilters(page);
      } else {
        fetchNovels(page);
      }
      if (page > 0) setLoader(<Loader2 />);
    }
  }, [page]); // Dependency array includes 'page'

  // useEffect(() => {
  //   if (
  //     selectedWriter ||
  //     selectedSort ||
  //     selectedGenres.length > 0 ||
  //     isPremium
  //   ) {
  //     handleApplyFilters(page);
  //   } else {
  //     fetchNovels(page);
  //   }

  //   if (page > 0) setLoader(<Loader2 />);
  // }, [page]);

  return (
    <div className="flex flex-col gap-5 py-5 justify-center">
      <Heading name="All Novels" />

      <div className="w-full max-w-5xl mx-auto mb-6">
        <Filter
          dropdowns={[
            {
              label: "Writers",
              options: writers || [],
              value: selectedWriter,
              onChange: setSelectedWriter,
            },
            {
              label: "Sort By",
              options: ["Latest", "Trending", "Popular"],
              value: selectedSort,
              onChange: setSelectedSort,
            },
          ]}
          checkboxes={genres.map((genre) => ({
            label: genre,
            checked: selectedGenres.includes(genre),
            onChange: (checked) =>
              setSelectedGenres((prev) =>
                checked ? [...prev, genre] : prev.filter((g) => g !== genre)
              ),
          }))}
          toggle={{
            label: "Show Premium Only",
            value: isPremium,
            onChange: setIsPremium,
          }}
          onclick={() => {
            setPage(0);
            setAllNovels([]);
            handleApplyFilters(page);
          }}
        />
      </div>

      {/* Filtered Results */}
      <div className="text-xs text-tertiary  flex flex-wrap gap-4 ">
        {selectedWriter && (
          <p className="opacity-50 whitespace-nowrap">
            Writer: {selectedWriter}
            <button className="px-2" onClick={() => setSelectedWriter("")}>
              ✕
            </button>
          </p>
        )}
        {selectedSort && (
          <p className="opacity-50 whitespace-nowrap">
            Sort: {selectedSort}
            <button className="px-2" onClick={() => setSelectedSort("")}>
              ✕
            </button>
          </p>
        )}
        {selectedGenres.length > 0 && (
          <p className="opacity-50 whitespace-nowrap">
            Genres: {selectedGenres.join(", ")}
            <button className="px-2" onClick={() => setSelectedGenres([])}>
              ✕
            </button>
          </p>
        )}

        {isPremium && (
          <p className="opacity-50 whitespace-nowrap ">
            {isPremium ? "Premium novels" : "Free"}
          </p>
        )}

        {/* Clear All button */}
        {(selectedWriter ||
          selectedSort ||
          selectedGenres.length > 0 ||
          isPremium) && (
          <button
            onClick={async () => {
              setSelectedWriter("");
              setSelectedSort("");
              setSelectedGenres([]);
              setIsPremium(false);
              setAllNovels([]);
              setPage(0);
              setHasMore(true);
              await fetchNovels(page);
            }}
            className="ml-auto text-secondary  text-sm px-2 py-1 rounded hover:bg-secondary/20 transition"
          >
            Clear All Filters
          </button>
        )}
      </div>

      <ul className="flex flex-wrap gap-5 justify-center lg:justify-start">
        {allNovels.map((novel, index) => (
          <Novel
            href={novel?.slug?.current ?? ""}
            cardBanner={novel.cardbannerurl}
            novelName={novel.title}
            writer={novel.writer?.writername}
            genre={novel.genre?.genrename}
            key={index}
          />
        ))}
      </ul>

      {loading && loader}

      {!loading && hasMore && (
        <LoadMoreButton onclick={() => setPage((prev) => prev + 1)} />
      )}

      {!hasMore && (
        <p className="text-center text-tertiary opacity-50 py-3">
          No more novels
        </p>
      )}
    </div>
  );
}
