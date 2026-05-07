import Link from "next/link";

export default function AboutPage() {
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
          About
        </p>
        <h1 className="mt-2 text-[clamp(2rem,7vw,3rem)] font-black tracking-tight text-[#10243f]">
          innov8ive Solutions
        </h1>

        <div className="mt-6 space-y-4 text-base leading-8 text-slate-700">
          <p>
            innov8ive Solutions is an accessibility-focused publication and
            resource hub. We help teams design and ship inclusive digital
            products through practical guides, implementation insights, and
            standards updates.
          </p>
          <p>
            Our goal is simple: make accessibility actionable for product
            teams, content teams, and engineering teams. We focus on real
            workflows, not checklists in isolation.
          </p>
          <p>
            From keyboard-first interaction patterns to content clarity and
            assistive technology compatibility, we share resources that help
            organizations build experiences that work for more people.
          </p>
        </div>
      </div>
    </main>
  );
}
