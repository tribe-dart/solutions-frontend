import Link from "next/link";
import FeaturedArticlesStrip from "./components/featured-articles-strip";
import HomeFeaturedSpotlight from "./components/home-featured-spotlight";
import HomeNewsCard from "./components/home-news-card";
import HomeSearchForm from "./components/home-search-form";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import { getFeaturedArticles, getLatestNews, getPublishedTaxonomy } from "./content";

type HomeProps = {
  searchParams: Promise<{ country?: string }>;
};

const defaultHeroImage = "/pages/hero-team.png";

const getItemHref = (slug: string, category?: "article" | "news") =>
  category === "article" ? `/articles/${slug}` : `/news/${slug}`;

export default async function Home({ searchParams }: HomeProps) {
  const { country: countryParam } = await searchParams;
  const [countries, categories, featuredArticles, latestNews] = await Promise.all([
    getPublishedTaxonomy("country"),
    getPublishedTaxonomy("category"),
    getFeaturedArticles(countryParam),
    getLatestNews(countryParam),
  ]);

  const selectedCountry = countries.find((country) => country.slug === countryParam);
  const topStory = latestNews[0] ?? featuredArticles[0];
  const spotlight = featuredArticles[0] ?? topStory;
  const gridItems = latestNews.slice(0, 6);
  const heroImage = topStory?.image ?? defaultHeroImage;
  const topStoryHref = topStory
    ? getItemHref(topStory.slug, topStory.category)
    : "/news";

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <SiteHeader active="home" />

      <main className="w-full px-4 pb-6 sm:px-6 lg:px-10 xl:px-12 2xl:px-14">
        <section className="w-full pt-6">
          <Link
            href={topStoryHref}
            className="relative block min-h-[380px] w-full overflow-hidden rounded-3xl bg-cover bg-center no-underline sm:min-h-[440px] lg:min-h-[480px]"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <h1 className="max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {topStory?.title ??
                  "Accessibility updates that help teams build inclusive digital products"}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
                {topStory?.summary ??
                  "Practical guidance on inclusive design, standards, and assistive technology for modern teams."}
              </p>
            </div>
          </Link>

          <HomeSearchForm
            countries={countries}
            categories={categories}
            selectedCountry={selectedCountry?.slug}
          />
        </section>

        <section className="mt-8 grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.85fr)]">
          {spotlight ? (
            <HomeFeaturedSpotlight
              item={spotlight}
              href={getItemHref(spotlight.slug, spotlight.category)}
            />
          ) : (
            <div className="flex min-h-[320px] items-center justify-center rounded-3xl bg-neutral-200 text-neutral-600">
              No featured article yet
            </div>
          )}

          {gridItems.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {gridItems.map((item) => (
                <HomeNewsCard
                  key={item.slug}
                  item={item}
                  href={getItemHref(item.slug, item.category)}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[320px] items-center justify-center rounded-3xl bg-white text-neutral-600">
              No news articles yet
            </div>
          )}
        </section>
      </main>

      <FeaturedArticlesStrip articles={featuredArticles} />
      <SiteFooter />
    </div>
  );
}
