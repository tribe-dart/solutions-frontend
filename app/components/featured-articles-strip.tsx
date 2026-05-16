import Link from "next/link";
import type { Innov8iveItem } from "../content";

type FeaturedArticlesStripProps = {
  articles: Innov8iveItem[];
};

const formatMetaDate = (date?: string) => {
  if (!date) {
    return "30th April 2026";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

export default function FeaturedArticlesStrip({
  articles,
}: FeaturedArticlesStripProps) {
  const items = articles.slice(0, 4);

  if (!items.length) {
    return null;
  }

  return (
    <section className="bg-white px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-black">Featured Articles</h2>
          <Link
            href="/articles"
            className="text-sm font-semibold text-black underline-offset-2 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group block no-underline"
            >
              <article>
                <div
                  className="aspect-[4/3] rounded-2xl bg-cover bg-center transition group-hover:opacity-90"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-neutral-600">
                  <span>{formatMetaDate(article.createdAt)}</span>
                  <span>•</span>
                  <span>12k Views</span>
                  <span>•</span>
                  <span>0</span>
                  <span className="ml-auto inline-block h-3 w-4 rounded-sm bg-[#c69762]" aria-hidden />
                </div>
                <p className="mt-2 line-clamp-3 text-sm font-semibold leading-snug text-black group-hover:text-[#c69762]">
                  {article.title}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
