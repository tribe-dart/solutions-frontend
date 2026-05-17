import Image from "next/image";
import Link from "next/link";

type SiteHeaderProps = {
  active?: "home" | "about" | "news" | "contact";
};

const navLinkClass = (isActive: boolean) =>
  `text-sm font-medium transition ${isActive ? "text-[#d4a574]" : "text-white hover:text-[#d4a574]"}`;

export default function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="bg-black px-4 py-3 text-white sm:px-6 lg:px-10 xl:px-12 2xl:px-14">
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center" aria-label="innov8ive Solutions Home">
          <Image
            src="/logo.png"
            alt="innov8ive Solutions logo"
            width={180}
            height={48}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="flex flex-wrap items-center gap-5 sm:gap-8">
          <Link href="/" className={navLinkClass(active === "home")}>
            Home
          </Link>
          <Link href="/about" className={navLinkClass(active === "about")}>
            About Us
          </Link>
          <Link href="/news" className={navLinkClass(active === "news")}>
            News
          </Link>
          <Link href="/contact" className={navLinkClass(active === "contact")}>
            Contact Us
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/admin"
            className="rounded-full bg-[#c69762] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#b88855]"
          >
            Login
          </Link>
          <button
            type="button"
            className="rounded-full border border-white bg-white px-5 py-2 text-sm font-semibold text-black"
          >
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
