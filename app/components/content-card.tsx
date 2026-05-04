import Link from "next/link";

type ContentCardProps = {
  title: string;
  image: string;
  href: string;
  summary?: string;
  label?: string;
  featured?: boolean;
};

export default function ContentCard({
  title,
  image,
  href,
  summary,
  label,
  featured = false,
}: ContentCardProps) {
  return (
    <Link href={href} className="group block h-full min-w-0 text-inherit no-underline">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#d9e7f2] bg-white p-3 shadow-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
        <div
          className={`w-full rounded-xl bg-cover bg-center ${
            featured ? "h-44 md:h-48" : "h-40"
          }`}
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
        <div className="flex flex-1 flex-col px-1 pb-1 pt-3">
          {label ? (
            <span className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0f766e]">
              {label}
            </span>
          ) : null}
          <h3 className="line-clamp-3 wrap-break-word text-base font-semibold leading-snug text-slate-950 md:text-lg">
            {title}
          </h3>
          {summary ? (
            <p className="mt-2 line-clamp-3 wrap-break-word text-sm leading-6 text-slate-600">
              {summary}
            </p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
