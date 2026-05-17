import Link from "next/link";
import type { Innov8iveItem, TaxonomySummary } from "../content";
import RichContentRenderer from "./rich-content-renderer";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

type DetailPageLayoutProps = {
  item: Innov8iveItem;
  label: string;
  detailPath: "/articles" | "/news";
  relatedItems: Innov8iveItem[];
  sidebarCategories: TaxonomySummary[];
  sidebarCountries: TaxonomySummary[];
  headerActive?: "home" | "about" | "news" | "contact";
};

type TaxonomyItem = {
  id: string;
  name: string;
  slug: string;
  count?: number;
};

const countryCodeBySlug: Record<string, string> = {
  global: "un",
  ghana: "gh",
  canada: "ca",
  usa: "us",
  "united-states": "us",
  "united-kingdom": "gb",
  germany: "de",
};

const uniqueBySlug = (items: TaxonomyItem[]) => {
  const seen = new Set<string>();

  return items.filter((entry) => {
    if (seen.has(entry.slug)) {
      return false;
    }

    seen.add(entry.slug);
    return true;
  });
};

const formatOrdinalDate = (date?: string) => {
  if (!date) {
    return "16th April 2024";
  }

  const parsed = new Date(date);
  const day = parsed.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  const monthYear = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(parsed);

  return `${day}${suffix} ${monthYear}`;
};

const AdvertBlock = ({ tall = false }: { tall?: boolean }) => (
  <aside
    className={`grid place-items-center rounded-2xl bg-[#d9a066] text-center font-black uppercase leading-tight text-white shadow-sm ${
      tall ? "min-h-[280px] px-4 text-3xl lg:sticky lg:top-4" : "min-h-32 px-4 text-2xl"
    }`}
  >
    Advertise
    <br />
    Here
  </aside>
);

const SidebarWidget = ({
  title,
  items,
  getHref,
}: {
  title: string;
  items: TaxonomyItem[];
  getHref: (item: TaxonomyItem) => string;
}) => (
  <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
    <div className="bg-black px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white">
      {title}
    </div>
    <div className="grid gap-0 p-4">
      {items.length ? (
        items.map((entry) => (
          <Link
            key={`${title}-${entry.id}`}
            href={getHref(entry)}
            className="border-b border-neutral-200 py-2.5 text-sm font-medium text-black last:border-b-0 hover:text-[#c69762]"
          >
            {entry.name}
          </Link>
        ))
      ) : (
        <p className="text-sm text-neutral-500">No items yet.</p>
      )}
    </div>
  </section>
);

const RelatedCard = ({
  item,
  href,
}: {
  item: Innov8iveItem;
  href: string;
}) => (
  <Link
    href={href}
    className="block min-w-[220px] max-w-[220px] shrink-0 no-underline sm:min-w-[240px] sm:max-w-[240px]"
  >
    <article>
      <div
        className="aspect-4/3 rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${item.image})` }}
        aria-hidden
      />
      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-neutral-600">
        <span>{formatOrdinalDate(item.createdAt)}</span>
        <span aria-hidden>•</span>
        <span>1.5k Views</span>
        <span aria-hidden>•</span>
        <span>0</span>
        <span
          className="ml-auto inline-block h-3 w-4 rounded-sm bg-[#c69762]"
          aria-hidden
        />
      </div>
      <p className="mt-2 line-clamp-3 text-sm font-semibold leading-snug text-black">
        {item.title}
      </p>
    </article>
  </Link>
);

const Conversation = () => (
  <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
    <h2 className="text-xl font-bold text-black">Conversation</h2>
    <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
      All comments are subject to our Community Guidelines. Please keep the
      conversation respectful and constructive.
    </p>

    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-neutral-200 text-neutral-500">
        ●
      </div>
      <input
        className="h-12 min-w-0 flex-1 rounded-xl border border-neutral-200 bg-[#ececec] px-4 text-sm outline-none"
        placeholder="Join the conversation"
      />
      <button
        type="button"
        className="h-12 shrink-0 rounded-full bg-black px-8 text-sm font-bold text-white"
      >
        Post
      </button>
    </div>

    <div className="mt-8 grid gap-6">
      {["MrsMason", "MrsMason"].map((name, index) => (
        <article key={`${name}-${index}`} className="flex gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-black text-sm font-bold text-white">
            {name[0]}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-black">
              {name}{" "}
              <span className="ml-2 text-xs font-semibold uppercase text-neutral-400">
                44 min ago
              </span>
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-700">
              Your article says a lot about accessibility standards. Try hiring
              a proof reader before publishing.
            </p>
            <div className="mt-2 flex gap-4 text-xs font-semibold uppercase text-neutral-500">
              <button type="button">Reply</button>
              <button type="button" aria-label="Upvote">
                ▲
              </button>
              <button type="button" aria-label="Downvote">
                ▼
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default function DetailPageLayout({
  item,
  label,
  detailPath,
  relatedItems,
  sidebarCategories,
  sidebarCountries,
  headerActive = "news",
}: DetailPageLayoutProps) {
  const categories = uniqueBySlug(item.postCategories ?? []);
  const countries = uniqueBySlug(item.countries ?? []);
  const categoryLabel = categories[0]?.name ?? label;
  const country = countries[0];
  const countryCode = country ? countryCodeBySlug[country.slug] : "gh";
  const related = relatedItems
    .filter((relatedItem) => relatedItem.slug !== item.slug)
    .slice(0, 3);
  const displayDate = formatOrdinalDate(item.createdAt);
  const breadcrumbDate = item.createdAt
    ? new Intl.DateTimeFormat("en-CA").format(new Date(item.createdAt)).replace(/-/g, " ")
    : "2026 04 30";

  return (
    <div className="min-h-screen bg-[#ececec] text-black">
      <SiteHeader active={headerActive} />

      <div className="border-b border-neutral-300 bg-[#e3e3e3] px-4 py-2 text-xs text-neutral-700 sm:px-8">
        <p className="mx-auto max-w-7xl wrap-break-word">
          You are here: <Link href="/" className="font-semibold hover:underline">Home</Link>
          {" » "}
          <span>{categoryLabel}</span>
          {" » "}
          <span>{breadcrumbDate}</span>
          {" » "}
          <span className="text-neutral-600">Article {item.slug.slice(0, 8)}</span>
        </p>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 space-y-6">
            <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-neutral-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {categoryLabel}
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
                  <span>{displayDate}</span>
                  <span aria-hidden>•</span>
                  <span>1.5k Views</span>
                  <span aria-hidden>•</span>
                  <span>0</span>
                  {countryCode ? (
                    <span
                      className="ml-1 inline-block h-3.5 w-5 rounded-sm bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://flagcdn.com/w40/${countryCode}.png)`,
                      }}
                      title={country?.name}
                      aria-label={country?.name}
                    />
                  ) : null}
                </div>
              </div>

              <h1 className="mt-5 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-black">
                {item.title}
              </h1>

              <div
                className="mt-6 aspect-4/3 rounded-2xl bg-cover bg-center sm:aspect-auto sm:h-[390px]"
                style={{ backgroundImage: `url(${item.image})` }}
                aria-hidden
              />

              <p className="mt-6 text-base font-medium leading-8 text-neutral-800">
                {item.summary}
              </p>

              <div className="detail-content mt-6 min-w-0">
                <RichContentRenderer
                  contentJson={item.contentJson}
                  fallbackParagraphs={item.content}
                  excludedImageSrcs={[item.image]}
                />
              </div>

              {item.citation?.text ? (
                <aside className="mt-8 border-t border-neutral-200 pt-5">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                    Source
                  </span>
                  {item.citation.url ? (
                    <a
                      href={item.citation.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 block text-sm font-semibold text-[#c69762] underline"
                    >
                      {item.citation.text}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm text-neutral-700">{item.citation.text}</p>
                  )}
                </aside>
              ) : null}
            </article>

            {related.length ? (
              <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-bold text-black">Related Articles</h2>
                  <div className="flex items-center gap-3">
                    <Link
                      href={detailPath}
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      View All
                    </Link>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        aria-label="Previous related articles"
                        className="grid h-9 w-9 place-items-center rounded-full border border-neutral-300 text-lg"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        aria-label="Next related articles"
                        className="grid h-9 w-9 place-items-center rounded-full border border-neutral-300 text-lg"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {related.map((relatedItem) => (
                    <RelatedCard
                      key={relatedItem._id ?? relatedItem.slug}
                      item={relatedItem}
                      href={`${detailPath}/${relatedItem.slug}`}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            <AdvertBlock />
            <Conversation />
          </div>

          <aside className="grid content-start gap-5">
            <AdvertBlock tall />
            <SidebarWidget
              title="Categories"
              items={sidebarCategories}
              getHref={(category) => `/categories/${category.slug}`}
            />
            <SidebarWidget
              title="News by Country"
              items={sidebarCountries}
              getHref={(countryItem) => `/countries/${countryItem.slug}`}
            />
            <AdvertBlock tall />
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
