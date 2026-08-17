import Novel from "./components/Cards/Novel";
import PDF from "./components/Cards/PDF";
import Heading from "./components/Heading";
import HomeFilter from "./components/HomeFilter";
import Ads from "./components/Ads";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { cleanDescription } from "@/lib/seo";

export const revalidate = 300;

type SearchParams = { writer?: string; genre?: string; sort?: string; yt?: string };

async function getHomeContent() {
  const query = `{
    "latestNovels": *[_type == "novelparent" && defined(novelreleasedate) && novelreleasedate <= now()] | order(novelreleasedate desc)[0...8] { _id, title, banner, slug, novelreleasedate, noveldescription, youtubeurl, genre->{genrename}, writer->{writername}, "views": *[_type == "novel" && references(^._id)].views, "monthlyViews": *[_type == "novel" && references(^._id)].monthlyViews },
    "latestPdfs": *[_type == "pdf" && defined(pdfreleasedate) && pdfreleasedate <= now()] | order(pdfreleasedate desc)[0...4] { _id, title, banner, slug, pdfreleasedate, pdfdescription, youtubeurl, views, monthlyViews, genre->{genrename}, writer->{writername} },
    "popularNovels": *[_type == "novelparent" && defined(novelreleasedate) && novelreleasedate <= now()] { _id, title, banner, slug, novelreleasedate, noveldescription, youtubeurl, genre->{genrename}, writer->{writername}, "views": *[_type == "novel" && references(^._id)].views, "monthlyViews": *[_type == "novel" && references(^._id)].monthlyViews },
    "popularPdfs": *[_type == "pdf" && defined(pdfreleasedate) && pdfreleasedate <= now()] | order(coalesce(views,0) desc)[0...4] { _id, title, banner, slug, pdfreleasedate, pdfdescription, youtubeurl, views, monthlyViews, genre->{genrename}, writer->{writername} }
  }`;
  const data = await client.fetch<any>(query, {}, { next: { revalidate: 300 } });
  const sum = (v: any) =>
    Array.isArray(v)
      ? v.reduce((a: number, x: number) => a + (Number(x) || 0), 0)
      : Number(v) || 0;
  const enrich = (list: any[]) =>
    (list || []).map((n: any) => ({
      ...n,
      totalViews: sum(n.views),
      totalMonthlyViews: sum(n.monthlyViews),
    }));
  return {
    latestNovels: enrich(data.latestNovels),
    latestPdfs: enrich(data.latestPdfs),
    popularNovels: enrich(data.popularNovels),
    popularPdfs: enrich(data.popularPdfs),
  };
}

function date(value: string) {
  return new Date(value).toLocaleDateString("en-GB");
}

function applyFilters(
  items: any[],
  writer: string,
  genres: string[],
  youtubeOnly: boolean,
  sort: string
) {
  let result = items.filter((item) => {
    const matchesWriter = !writer || item.writer?.writername === writer;
    const matchesGenre =
      genres.length === 0 || genres.some((g) => g === item.genre?.genrename);
    const matchesYt =
      !youtubeOnly || (item.youtubeurl && item.youtubeurl.trim() !== "");
    return matchesWriter && matchesGenre && matchesYt;
  });

  if (sort === "Latest") {
    result = [...result].sort(
      (a, b) =>
        new Date(a.novelreleasedate || a.pdfreleasedate).getTime() -
        new Date(b.novelreleasedate || b.pdfreleasedate).getTime()
    );
  } else if (sort === "Popular") {
    result = [...result].sort(
      (a, b) => (b.totalViews || 0) - (a.totalViews || 0)
    );
  } else if (sort === "Trending") {
    result = [...result].sort(
      (a, b) => (b.totalMonthlyViews || 0) - (a.totalMonthlyViews || 0)
    );
  }

  return result;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const data = await getHomeContent();
  const params = await searchParams;
  const writer = params?.writer || "";
  const genres =
    typeof params?.genre === "string" && params.genre
      ? params.genre.split(",").filter(Boolean)
      : [];
  const sort = params?.sort || "";
  const youtubeOnly = params?.yt === "1";

  const latestNovels = (data.latestNovels || []).map((x: any) => ({
    ...x,
    type: "novel",
  }));
  const latestPdfs = (data.latestPdfs || []).map((x: any) => ({
    ...x,
    type: "pdf",
  }));
  const popularNovels = (data.popularNovels || []).map((x: any) => ({
    ...x,
    type: "novel",
  }));
  const popularPdfs = (data.popularPdfs || []).map((x: any) => ({
    ...x,
    type: "pdf",
  }));

  const trendingNovels = applyFilters(
    popularNovels,
    writer,
    genres,
    youtubeOnly,
    "Trending"
  )
    .filter((n: any) => (n.totalViews || 0) > 1000)
    .slice(0, 6);

  const latest = [
    ...applyFilters(latestNovels, writer, genres, youtubeOnly, sort),
    ...applyFilters(latestPdfs, writer, genres, youtubeOnly, sort),
  ];
  const popular = [
    ...applyFilters(
      popularNovels,
      writer,
      genres,
      youtubeOnly,
      sort || "Popular"
    ).slice(0, 8),
    ...applyFilters(
      popularPdfs,
      writer,
      genres,
      youtubeOnly,
      sort || "Popular"
    ).slice(0, 4),
  ];
  const hasTrending = trendingNovels.length > 0;

  const hasFilters =
    writer !== "" || genres.length > 0 || sort !== "" || youtubeOnly;
  const writers = await client.fetch<string[]>(
    `*[_type == "writer"] { writername }.writername`
  );
  const allGenres = await client.fetch<string[]>(
    `*[_type == "genre"] { genrename }.genrename`
  );

  return (
    <main className="text-tertiary flex flex-col gap-6 lg:py-8">
      {/* HERO — Bold dark emerald banner */}
      <section aria-labelledby="welcome-heading" className="relative mx-4 lg:mx-0 rounded-3xl overflow-hidden bg-[#1E5D50] shadow-2xl">
        <div aria-hidden="true" className="absolute inset-0 -z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-[#2F7565]/40 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-[#C9A96E]/15 blur-3xl"></div>
        </div>
        <div className="relative text-center px-6 py-14 lg:py-20 flex flex-col items-center gap-5">
          <span className="inline-block px-5 py-2 rounded-full border-2 border-[#C9A96E]/60 text-[#C9A96E] text-sm font-bold tracking-wide uppercase">
            Huma Qureshi Novels
          </span>
          <h1
            id="welcome-heading"
            className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl"
          >
            Read Urdu Novels Online Free
          </h1>
          <p className="mx-auto max-w-2xl text-base lg:text-lg leading-8 text-white/80">
            Original Urdu novels, episodic stories and complete PDF books by Huma
            Qureshi — read online free or download to read offline.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link
              href="/novel"
              className="bg-[#C9A96E] text-[#1E5D50] font-bold px-8 py-3 rounded-full hover:bg-[#d4b57a] active:scale-95 transition text-lg shadow-lg"
            >
              Browse Novels
            </Link>
            <Link
              href="/pdf"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-[#1E5D50] active:scale-95 transition text-lg shadow-lg"
            >
              PDF Library
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL FIND */}
      <section aria-labelledby="whats-here-heading" className="py-2">
        <Heading name="What You Will Find Here" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto px-5 lg:px-10 py-5">
          {[
            {
              title: "Episodic Novels",
              desc: "Long Urdu novels published episode by episode. Read the latest chapter, then continue from where you left off.",
            },
            {
              title: "Complete PDF Novels",
              desc: "Finished stories available as a single PDF download for reading offline or on your phone.",
            },
            {
              title: "Short Stories & Afsanas",
              desc: "Quick emotional reads that can be finished in one sitting.",
            },
            {
              title: "Browse by Writer and Genre",
              desc: "Filter stories by your favourite writer or by genre such as Romance, Thriller, Cultural Fiction and more.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-2xl border-2 border-[#1E5D50]/30 bg-[#FFFDF9] p-6 hover:border-[#1E5D50] hover:shadow-xl hover:-translate-y-0.5 transition duration-300"
            >
              <span className="w-11 h-11 rounded-full bg-[#8B6914] text-white font-extrabold flex items-center justify-center text-lg shadow-md">
                {i + 1}
              </span>
              <h3 className="text-lg font-extrabold text-[#1E5D50]">{f.title}</h3>
              <p className="leading-7 text-tertiary font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      {hasTrending && (
      <section id="trending" aria-labelledby="trending-heading" className="py-2">
        <Heading name="Trending Novels" />
        <p className="mx-auto max-w-4xl px-5 pb-4 text-center leading-7 font-medium">
          The most-read Urdu novels on Huma Qureshi Novels right now — stories with over 1,000 readers.
        </p>
        <div className="flex gap-5 flex-wrap justify-center lg:justify-start lg:px-10 lg:gap-6">
          {trendingNovels.map((item: any) => (
            <Novel key={item._id} date={date(item.novelreleasedate)} href={item.slug.current} cardBanner={item.banner} novelName={item.title} writer={item.writer?.writername || ""} genre={item.genre?.genrename || ""} summary={cleanDescription(item.noveldescription, "")} />
          ))}
        </div>
      </section>
      )}

      <Ads format="banner" />

      {/* BROWSE + FILTER */}
      <section aria-labelledby="browse-heading" className="py-2 bg-[#FAF7F2] rounded-3xl mx-4 lg:mx-0 px-6 py-8">
        <Heading name="Browse Novels" />
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-4 pt-4">
          <p className="text-center leading-7 font-medium">
            Filter Urdu novels and PDFs by writer and genre. Choose your options
            and press Apply filter.
          </p>
          <HomeFilter writers={writers || []} genres={allGenres || []} />
          {hasFilters && (
            <p className="text-center text-sm font-bold text-[#1E5D50]">
              Showing {latest.length + popular.length} results
              {writer ? ` for writer "${writer}"` : ""}
              {genres.length > 0 ? ` in ${genres.join(", ")}` : ""}
            </p>
          )}
        </div>
      </section>

      {/* LATEST */}
      <section id="latest" aria-labelledby="latest-heading" className="py-2">
        <Heading name="Latest Novels & PDFs" />
        {latest.length > 0 ? (
        <p className="mx-auto max-w-4xl px-5 pb-4 text-center leading-7 font-medium">
          Read Urdu novels, new episodes and PDF books on Huma Qureshi Novels. Browse the latest stories by writer and genre.
        </p>
        ) : (
          <p className="text-center py-4 font-medium">No latest content matches your filters.</p>
        )}
        {latest.length > 0 && (
        <div className="flex gap-5 flex-wrap justify-center lg:justify-start lg:px-10 lg:gap-6">
          {latest.map((item: any) => item.type === "novel" ? (
            <Novel key={item._id} date={date(item.novelreleasedate)} href={item.slug.current} cardBanner={item.banner} novelName={item.title} writer={item.writer?.writername || ""} genre={item.genre?.genrename || ""} summary={cleanDescription(item.noveldescription, "")} />
          ) : (
            <PDF key={item._id} date={date(item.pdfreleasedate)} href={item.slug.current} cardBanner={item.banner} novelName={item.title} writer={item.writer?.writername || ""} genre={item.genre?.genrename || ""} summary={cleanDescription(item.pdfdescription, "")} />
          ))}
        </div>
        )}
      </section>

      <Ads format="rectangle" />

      {/* POPULAR */}
      <section id="popular" aria-labelledby="popular-heading" className="py-2">
        <Heading name="Popular Novels & PDFs" />
        {popular.length > 0 ? (
        <p className="mx-auto max-w-4xl px-5 pb-4 text-center leading-7 font-medium">
          The most popular Urdu novels and PDF books on Huma Qureshi Novels, ranked by reader views.
        </p>
        ) : (
          <p className="text-center py-4 font-medium">No popular content matches your filters.</p>
        )}
        {popular.length > 0 && (
        <div className="flex gap-5 flex-wrap justify-center lg:justify-start lg:px-10 lg:gap-6">
          {popular.map((item: any) => item.type === "novel" ? (
            <Novel key={item._id} date={date(item.novelreleasedate)} href={item.slug.current} cardBanner={item.banner} novelName={item.title} writer={item.writer?.writername || ""} genre={item.genre?.genrename || ""} summary={cleanDescription(item.noveldescription, "")} />
          ) : (
            <PDF key={item._id} date={date(item.pdfreleasedate)} href={item.slug.current} cardBanner={item.banner} novelName={item.title} writer={item.writer?.writername || ""} genre={item.genre?.genrename || ""} summary={cleanDescription(item.pdfdescription, "")} />
          ))}
        </div>
        )}
      </section>
    </main>
  );
}
