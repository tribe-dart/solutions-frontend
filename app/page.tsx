import Image from "next/image";
import Link from "next/link";
import ContentCard from "./components/content-card";
import HomeSearchForm from "./components/home-search-form";
import { getFeaturedArticles, getLatestNews, getPublishedTaxonomy } from "./content";

type HomeProps = {
  searchParams: Promise<{ country?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { country: countryParam } = await searchParams;
  const [countries, featuredArticles, latestNews] = await Promise.all([
    getPublishedTaxonomy("country"),
    getFeaturedArticles(countryParam),
    getLatestNews(countryParam),
  ]);
  const selectedCountry = countries.find((country) => country.slug === countryParam);
  const topStory = latestNews[0] ?? featuredArticles[0];
  const topStoryHref = topStory
    ? topStory.category === "article"
      ? `/articles/${topStory.slug}`
      : `/news/${topStory.slug}`
    : "/";

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <main className="min-h-screen overflow-hidden bg-[#f8fbff]">
        <section
          className="relative min-h-[500px] bg-cover bg-center px-5 pb-8 pt-4 sm:px-8 lg:pb-[118px]"
          style={
            topStory
              ? { backgroundImage: `url(${topStory.image})` }
              : undefined
          }
        >
          <div className="absolute inset-0 bg-linear-to-br from-[#10243f]/90 via-[#1f3560]/82 to-[#0f766e]/78" />
          <header className="relative z-10 flex flex-col gap-4 text-white sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-white px-4 py-2"
              aria-label="innov8ive Solutions Home"
            >
              <Image
                src="/logo.png"
                alt="innov8ive Solutions logo"
                width={160}
                height={44}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
            <nav className="flex flex-wrap gap-3 text-sm font-medium text-white/90 sm:gap-6">
              <Link className="transition hover:text-white" href="/">
                Home
              </Link>
              <Link className="transition hover:text-white" href="/about">
                About
              </Link>
              <Link className="transition hover:text-white" href="/news">
                Updates
              </Link>
              <Link className="transition hover:text-white" href="/articles">
                Guides
              </Link>
              <Link className="transition hover:text-white" href="/contact">
                Contact
              </Link>
            </nav>
          </header>

          {topStory ? (
            <Link
              href={topStoryHref}
              className="relative z-10 mt-16 block max-w-2xl text-white no-underline md:mt-24"
            >
              <h1 className="wrap-break-word text-[clamp(2.25rem,11vw,3.75rem)] font-bold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                {topStory.title}
              </h1>
              <p className="mt-4 max-w-xl wrap-break-word text-base leading-7 text-white/85 sm:text-lg">
                {topStory.summary}
              </p>
            </Link>
          ) : (
            <div className="relative z-10 mt-16 max-w-2xl text-white md:mt-24">
              <h1 className="wrap-break-word text-[clamp(2.25rem,11vw,3.75rem)] font-bold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                No top story available yet
              </h1>
              <p className="mt-4 max-w-xl wrap-break-word text-base leading-7 text-white/85 sm:text-lg">
                Check back soon for accessibility guidance, inclusive design
                updates, and assistive technology stories.
              </p>
            </div>
          )}

          <HomeSearchForm
            countries={countries}
            selectedCountry={selectedCountry?.slug}
          />
        </section>

        <section className="px-5 pt-8 sm:px-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="min-w-0 wrap-break-word text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              {selectedCountry
                ? `Featured Accessibility Guides in ${selectedCountry.name}`
                : "Featured Accessibility Guides"}
            </h2>
            <Link
              href="/articles"
              className="text-sm font-semibold text-[#0f766e] transition hover:text-[#115e59]"
            >
              View All
            </Link>
          </div>
          {featuredArticles.length ? (
            <div className="grid gap-5 md:grid-cols-3">
              {featuredArticles.slice(0, 3).map((article, index) => (
                <ContentCard
                  key={`${article.slug}-${index}`}
                  title={article.title}
                  image={article.image}
                  href={`/articles/${article.slug}`}
                  featured
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
              No featured accessibility guides found for this region.
            </div>
          )}
        </section>

        <section className="px-5 pt-8 sm:px-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="min-w-0 wrap-break-word text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              {selectedCountry
                ? `Latest Accessibility Updates in ${selectedCountry.name}`
                : "Latest Accessibility Updates"}
            </h2>
            <Link
              href="/news"
              className="text-sm font-semibold text-[#0f766e] transition hover:text-[#115e59]"
            >
              View All
            </Link>
          </div>
          {latestNews.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {latestNews.slice(0, 9).map((article, index) => (
                <ContentCard
                  key={`${article.slug}-${index}`}
                  title={article.title}
                  image={article.image}
                  href={`/news/${article.slug}`}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
              No accessibility updates found for this region.
            </div>
          )}
        </section>

        <footer className="mt-10 bg-[#10243f] px-5 py-8 text-white sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold">Stay in the loop</h3>
              <p className="mt-1 text-base text-slate-300">
                Get practical accessibility tips, standards updates, and
                inclusive design resources.
              </p>
            </div>
            <form className="flex w-full flex-col overflow-hidden rounded-2xl border-2 border-white/80 bg-white sm:flex-row sm:rounded-full md:max-w-lg">
              <input
                className="h-12 min-w-0 flex-1 border-0 px-5 text-slate-900 outline-none placeholder:text-slate-500"
                type="email"
                placeholder="Email Address"
              />
              <button
                className="h-12 w-full bg-[#5eead4] font-semibold text-[#10243f] transition hover:bg-[#2dd4bf] sm:w-[170px]"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="mt-6 flex flex-col gap-4 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
            <p>© 2026 innov8ive Solutions. Inclusive access for every user.</p>
            <div className="flex flex-wrap gap-6">
              <a className="transition hover:text-white" href="#">
                Terms and Conditions
              </a>
              <a className="transition hover:text-white" href="#">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
