import Link from "next/link";

type PaginationProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
};

const getPageHref = (basePath: string, page: number) => {
  const [pathname, queryString] = basePath.split("?");
  const params = new URLSearchParams(queryString);

  if (page === 1) {
    params.delete("page");
  } else {
    params.set("page", String(page));
  }

  const query = params.toString();

  return query ? `${pathname}?${query}` : pathname;
};

export default function Pagination({
  basePath,
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2 overflow-x-auto px-1"
      aria-label="Pagination"
    >
      <Link
        href={getPageHref(basePath, previousPage)}
        className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
          currentPage === 1
            ? "pointer-events-none border-slate-200 text-slate-400"
            : "border-slate-300 text-slate-700 hover:border-[#d0873a] hover:text-[#8a5a22]"
        }`}
        aria-disabled={currentPage === 1}
      >
        Previous
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={getPageHref(basePath, page)}
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border text-sm font-semibold transition ${
            page === currentPage
              ? "border-[#d0873a] bg-[#d0873a] text-slate-950"
              : "border-slate-300 text-slate-700 hover:border-[#d0873a] hover:text-[#8a5a22]"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      <Link
        href={getPageHref(basePath, nextPage)}
        className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
          currentPage === totalPages
            ? "pointer-events-none border-slate-200 text-slate-400"
            : "border-slate-300 text-slate-700 hover:border-[#d0873a] hover:text-[#8a5a22]"
        }`}
        aria-disabled={currentPage === totalPages}
      >
        Next
      </Link>
    </nav>
  );
}
