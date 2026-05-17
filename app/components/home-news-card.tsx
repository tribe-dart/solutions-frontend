import Link from "next/link";
import type { Innov8iveItem } from "../content";

type HomeNewsCardProps = {
  item: Innov8iveItem;
  href: string;
};

const formatMetaDate = (date?: string) => {
  if (!date) {
    return "30th April 2026";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

export default function HomeNewsCard({ item, href }: HomeNewsCardProps) {
  return (
    <Link href={href} className="group block no-underline">
      <article className="overflow-hidden rounded-2xl bg-white">
        <div
          className="aspect-4/3 rounded-2xl bg-cover bg-center transition group-hover:opacity-90"
          style={{ backgroundImage: `url(${item.image})` }}
          aria-hidden
        />
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-neutral-600">
          <span>{formatMetaDate(item.createdAt)}</span>
          <span aria-hidden>•</span>
          <span>1.2k Views</span>
          <span aria-hidden>•</span>
          <span>0</span>
          <span
            className="ml-auto inline-block h-3 w-4 rounded-sm bg-[#c69762]"
            aria-hidden
          />
        </div>
        <p className="mt-2 line-clamp-3 text-sm font-semibold leading-snug text-black group-hover:text-[#c69762]">
          {item.title}
        </p>
      </article>
    </Link>
  );
}
