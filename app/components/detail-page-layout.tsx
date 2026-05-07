import Image from "next/image";
import Link from "next/link";
import type { Innov8iveItem, TaxonomySummary } from "../content";
import RichContentRenderer from "./rich-content-renderer";

type DetailPageLayoutProps = {
  item: Innov8iveItem;
  label: string;
  detailPath: "/articles" | "/news";
  relatedItems: Innov8iveItem[];
  sidebarCategories: TaxonomySummary[];
  sidebarCountries: TaxonomySummary[];
};

type TaxonomyItem = {
  id: string;
  name: string;
  slug: string;
  count?: number;
};

const uniqueBySlug = (items: TaxonomyItem[]) => {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.slug)) {
      return false;
    }

    seen.add(item.slug);
    return true;
  });
};

const formatDate = (date?: string) => {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

const AdvertCard = ({ wide = false }: { wide?: boolean }) => (
  <aside
    className={`rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5 ${
      wide ? "" : "lg:sticky lg:top-4"
    }`}
  >
    <p className="mb-2 text-[10px] font-semibold text-slate-500">
      Resource spotlight
    </p>
    <div
      className={`grid place-items-center rounded-xl bg-[#10243f] px-4 text-center font-black uppercase leading-none text-[#5eead4] ${
        wide ? "h-32 text-3xl" : "h-64 text-4xl"
      }`}
    >
      Build
      <br />
      Accessibly
    </div>
  </aside>
);

const SidebarList = ({
  title,
  items,
  getHref,
}: {
  title: string;
  items: TaxonomyItem[];
  getHref: (item: TaxonomyItem) => string;
}) => (
  <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
    <h2 className="mb-3 rounded-full bg-[#5eead4] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#10243f]">
      {title}
    </h2>
    {items.length ? (
      <div className="grid gap-2">
        {items.map((item) => (
          <Link
            key={`${title}-${item.id}`}
            href={getHref(item)}
            className="flex items-start justify-between gap-3 border-b border-slate-200 pb-1 text-sm font-semibold text-slate-800 last:border-b-0"
          >
            <span className="min-w-0 wrap-break-word">{item.name}</span>
            {typeof item.count === "number" ? (
              <span className="shrink-0 text-xs text-slate-400">{item.count}</span>
            ) : null}
          </Link>
        ))}
      </div>
    ) : (
      <p className="text-sm text-slate-500">No items attached yet.</p>
    )}
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
    className="block min-w-[74vw] max-w-[74vw] no-underline min-[420px]:min-w-[210px] min-[420px]:max-w-[210px]"
  >
    <article className="overflow-hidden rounded-xl bg-white p-2 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className="h-28 rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${item.image})` }}
        aria-hidden="true"
      />
      <h3 className="mt-2 line-clamp-2 wrap-break-word text-sm font-bold leading-tight text-slate-950">
        {item.title}
      </h3>
    </article>
  </Link>
);

const Conversation = () => (
  <section className="mt-8">
    <h2 className="text-xl font-black text-slate-950">Conversation</h2>
    <p className="mt-1 max-w-2xl text-sm text-slate-600">
      All comments are subject to our Community Guidelines. Please keep the
      conversation respectful and constructive.
    </p>
    <div className="mt-4 flex items-center gap-3 max-[420px]:items-start">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-400 shadow-sm">
        ●
      </div>
      <input
        className="h-12 min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none"
        placeholder="Join the conversation"
      />
    </div>
    <div className="mt-3 flex justify-center">
      <button
        type="button"
        className="rounded-full bg-[#d0873a] px-6 py-2 text-sm font-bold text-slate-950"
      >
        Share
      </button>
    </div>
    <div className="mt-8 grid gap-6">
      {["Amina", "Jonah"].map((name, index) => (
        <article key={`${name}-${index}`} className="flex gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#10243f] text-sm font-bold text-white">
            {name[0]}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black text-slate-900">
              {name} <span className="ml-2 text-xs font-semibold text-slate-400">4h ago</span>
            </p>
            <p className="mt-2 max-w-2xl wrap-break-word text-sm leading-6 text-slate-700">
              This resource helped our team spot barriers earlier in the design
              review.
            </p>
            <div className="mt-2 flex gap-3 text-sm text-slate-500">
              <button type="button">Reply</button>
              <button type="button">▲</button>
              <button type="button">▼</button>
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
}: DetailPageLayoutProps) {
  const categories = uniqueBySlug(item.postCategories ?? []);
  const countries = uniqueBySlug(item.countries ?? []);
  const tagItems = item.tags ?? [];
  const related = relatedItems
    .filter((relatedItem) => relatedItem.slug !== item.slug)
    .slice(0, 6);
  const displayDate = formatDate(item.createdAt);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f7fb] text-slate-950">
      <header className="bg-[#10243f] px-4 py-3 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 sm:gap-5">
          <Link
            href="/"
            aria-label="innov8ive Solutions Home"
            className="inline-flex items-center rounded-full bg-white px-4 py-2"
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
          <nav className="hidden items-center gap-5 text-xs font-semibold md:flex">
            <Link href="/">Home</Link>
            <a href="#">About</a>
            <Link href="/articles">Guides</Link>
            <Link href="/news">Updates</Link>
            <a href="#">Contact</a>
          </nav>
          <div className="flex shrink-0 gap-2">
            <Link
              href="/admin"
              className="rounded-full bg-[#5eead4] px-4 py-1.5 text-xs font-bold text-[#10243f]"
            >
              Login
            </Link>
            <button className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-slate-950">
              Sign up
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-8 sm:py-5">
        <p className="mb-4 wrap-break-word text-xs font-semibold leading-5 text-slate-700">
          You are here: <Link href="/">Home</Link> &raquo; {label}
          {displayDate ? ` &raquo; ${displayDate}` : ""} &raquo; {item.title}
        </p>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <article className="min-w-0 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
              <div className="mb-3 flex flex-wrap items-start gap-2 sm:items-center">
                {categories[0] ? (
                  <span className="min-w-0 wrap-break-word text-sm font-black text-slate-950">
                    {categories[0].name}
                  </span>
                ) : (
                  <span className="text-sm font-black text-slate-950">{label}</span>
                )}
                <div className="flex w-full flex-wrap items-center gap-2 sm:ml-auto sm:w-auto sm:justify-end">
                  {tagItems.slice(0, 2).map((tag) => (
                    <span
                      key={`tag-${tag.id}`}
                      className="max-w-full wrap-break-word rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase text-slate-600"
                    >
                      #{tag.name}
                    </span>
                  ))}
                  {countries.slice(0, 2).map((country) => (
                    <span
                      key={`country-${country.id}`}
                      className="max-w-full wrap-break-word rounded-full bg-[#ccfbf1] px-2 py-1 text-[10px] font-bold text-[#115e59]"
                    >
                      {country.name}
                    </span>
                  ))}
                </div>
              </div>
              <h1 className="max-w-3xl wrap-break-word text-[clamp(2rem,9vw,3rem)] font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-5xl sm:leading-[0.98]">
                {item.title}
              </h1>
              <div
                className="mt-5 aspect-4/3 rounded-xl bg-cover bg-center sm:aspect-auto sm:h-[390px]"
                style={{ backgroundImage: `url(${item.image})` }}
                aria-hidden="true"
              />
              <p className="mt-5 wrap-break-word text-base font-semibold leading-7 text-slate-800">
                {item.summary}
              </p>
              <div className="detail-content mt-5 min-w-0">
                <RichContentRenderer
                  contentJson={item.contentJson}
                  fallbackParagraphs={item.content}
                  excludedImageSrcs={[item.image]}
                />
              </div>
              {item.citation?.text ? (
                <aside className="mt-6 border-t border-slate-200 pt-4">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                      Source
                  </span>
                  {item.citation.url ? (
                    <a
                      href={item.citation.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 block text-sm font-semibold text-[#0f766e] underline"
                    >
                      {item.citation.text}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm text-slate-700">{item.citation.text}</p>
                  )}
                </aside>
              ) : null}
            </article>

            {related.length ? (
              <section className="mt-8 min-w-0">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-black text-slate-950">
                    Related Resources
                  </h2>
                  <Link
                    href={detailPath}
                    className="text-sm font-bold text-slate-700"
                  >
                    View All
                  </Link>
                </div>
                <div className="flex min-w-0 gap-4 overflow-x-auto pb-2">
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

            <div className="mt-8">
              <AdvertCard wide />
            </div>

            <Conversation />
          </div>

          <aside className="grid min-w-0 content-start gap-5">
            <AdvertCard />
            <SidebarList
              title="Categories"
              items={sidebarCategories}
              getHref={(category) => `/categories/${category.slug}`}
            />
            <AdvertCard />
            <SidebarList
              title="Resources by Region"
              items={sidebarCountries}
              getHref={(country) => `/countries/${country.slug}`}
            />
          </aside>
        </div>
      </main>

      <footer className="mt-8 bg-[#10243f] px-4 py-8 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-black">Stay in the loop</h2>
            <p className="mt-1 text-sm text-slate-300">
              Get practical accessibility tips, standards updates, and
              inclusive design resources.
            </p>
          </div>
          <form className="flex w-full flex-col overflow-hidden rounded-2xl border-2 border-white bg-white sm:flex-row sm:rounded-full md:max-w-lg">
            <input
              className="h-11 min-w-0 flex-1 px-5 text-sm text-slate-900 outline-none"
              placeholder="Email Address"
              type="email"
            />
            <button className="h-11 w-full bg-[#5eead4] text-sm font-bold text-[#10243f] sm:w-36">
              Subscribe
            </button>
          </form>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-5 text-xs text-slate-300 md:flex-row md:justify-between">
          <p>© 2026 innov8ive Solutions. Inclusive access for every user.</p>
          <div className="flex gap-6">
            <a href="#">Terms and Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
