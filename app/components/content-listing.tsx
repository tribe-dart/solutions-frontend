import Link from "next/link";
import type { Innov8iveItem } from "../content";
import ContentCard from "./content-card";
import Pagination from "./pagination";

type ContentListingProps = {
  title: string;
  description: string;
  label: string;
  items: Innov8iveItem[];
  basePath: string;
  detailPath?: string;
  getItemHref?: (item: Innov8iveItem) => string;
  currentPage: number;
  totalPages: number;
  total: number;
  emptyMessage?: string;
};

export default function ContentListing({
  title,
  description,
  label,
  items,
  basePath,
  detailPath,
  getItemHref,
  currentPage,
  totalPages,
  total,
  emptyMessage = "No published items found.",
}: ContentListingProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fbff] px-4 py-6 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-3xl bg-white px-4 py-6 shadow-sm ring-1 ring-slate-200 sm:px-8">
          <Link
            href="/"
            className="text-sm font-semibold text-[#0f766e] transition hover:text-[#115e59]"
          >
            ← Back to Home
          </Link>
          <div className="mt-6 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f766e]">
              {label}
            </p>
            <h1 className="mt-2 wrap-break-word text-[clamp(2.25rem,10vw,3rem)] font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 wrap-break-word text-base leading-7 text-slate-600 sm:text-lg">
              {description}
            </p>
          </div>
        </header>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-slate-600">
            {total} {total === 1 ? "item" : "items"}
          </p>
          <p className="text-sm font-medium text-slate-600">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {items.length ? (
          <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <ContentCard
                key={item._id ?? item.slug}
                title={item.title}
                image={item.image}
                summary={item.summary}
                label={label}
                href={
                  getItemHref?.(item) ??
                  `${detailPath ?? (item.category === "article" ? "/articles" : "/news")}/${item.slug}`
                }
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            {emptyMessage}
          </div>
        )}

        <Pagination
          basePath={basePath}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
