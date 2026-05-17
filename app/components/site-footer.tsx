const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "X", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "TikTok", href: "#" },
];

const footerLinks = [
  "Accessibility Statement",
  "Enrollment Agreement",
  "Terms of Use",
  "Site Map",
];

export default function SiteFooter() {
  return (
    <footer className="bg-black px-4 py-10 text-white sm:px-6 lg:px-10 xl:px-12 2xl:px-14">
      <div className="w-full">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-sm">
            <h2 className="text-2xl font-bold">Follow Us</h2>
            <p className="mt-2 text-sm text-white/75">
              Send me tips, trends, freebies, updates &amp; offers.
            </p>
          </div>

          <form className="flex w-full max-w-xl flex-col overflow-hidden rounded-full border-2 border-white bg-white sm:flex-row">
            <input
              type="email"
              placeholder="Email Address"
              className="h-12 min-w-0 flex-1 border-0 px-5 text-sm text-black outline-none"
            />
            <button
              type="submit"
              className="h-12 bg-[#c69762] px-8 text-sm font-bold text-black transition hover:bg-[#b88855] sm:shrink-0"
            >
              Subscribe
            </button>
          </form>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="grid h-10 w-10 place-items-center rounded-full bg-[#c69762] text-xs font-bold text-black transition hover:bg-[#b88855]"
              >
                {item.label[0]}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 innov8ive Solutions. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {footerLinks.map((link) => (
              <a key={link} href="#" className="transition hover:text-white">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
