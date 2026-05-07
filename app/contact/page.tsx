import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8fbff] px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-10">
        <Link
          href="/"
          className="text-sm font-semibold text-[#0f766e] transition hover:text-[#115e59]"
        >
          ← Back to Home
        </Link>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-[#0f766e]">
          Contact
        </p>
        <h1 className="mt-2 text-[clamp(2rem,7vw,3rem)] font-black tracking-tight text-[#10243f]">
          Get in touch
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-700">
          Reach out to innov8ive Solutions for partnerships, editorial
          contributions, or accessibility support inquiries.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#f2f7fb] p-5">
            <h2 className="text-lg font-bold text-[#10243f]">Email</h2>
            <p className="mt-2 text-slate-700">hello@innov8ive.solutions</p>
          </div>
          <div className="rounded-2xl bg-[#f2f7fb] p-5">
            <h2 className="text-lg font-bold text-[#10243f]">Office hours</h2>
            <p className="mt-2 text-slate-700">Monday - Friday, 9:00 - 17:00</p>
          </div>
        </div>
      </div>
    </main>
  );
}
