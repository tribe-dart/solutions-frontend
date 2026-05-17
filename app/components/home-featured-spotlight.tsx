import Link from "next/link";
import type { Innov8iveItem } from "../content";

type HomeFeaturedSpotlightProps = {
  item: Innov8iveItem;
  href: string;
};

export default function HomeFeaturedSpotlight({
  item,
  href,
}: HomeFeaturedSpotlightProps) {
  return (
    <Link
      href={href}
      className="group relative block min-h-[520px] overflow-hidden rounded-3xl no-underline lg:min-h-full"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-[1.02]"
        style={{ backgroundImage: `url(${item.image})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <span className="inline-block rounded-md bg-[#c69762] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-black">
          Featured Articles
        </span>
        <p className="mt-4 max-w-xl text-lg font-semibold leading-relaxed text-white sm:text-xl">
          {item.summary || item.title}
        </p>
      </div>
    </Link>
  );
}
