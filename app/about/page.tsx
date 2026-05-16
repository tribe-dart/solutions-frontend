import Image from "next/image";
import Link from "next/link";
import PageHero from "../components/page-hero";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

const heroImage = "/pages/hero-team.png";
const teamImage = "/pages/about-team-1.png";
const visionImage = "/pages/about-team-2.png";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader active="about" />
      <PageHero title="About Us" imageUrl={heroImage} />

      <section className="px-4 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <Image
              src={teamImage}
              alt="Team collaborating on accessibility initiatives"
              width={640}
              height={480}
              className="w-full rounded-2xl object-cover"
            />
            <span className="absolute bottom-4 left-4 rounded-lg bg-[#c69762] px-4 py-2 text-sm font-bold text-black">
              5+ Years Of Experience
            </span>
          </div>

          <div>
            <p className="text-sm font-semibold text-neutral-600">About Us</p>
            <h2 className="mt-2 text-3xl font-bold text-black sm:text-4xl">
              Building inclusive digital experiences
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 sm:text-base">
              <p>
                innov8ive Solutions helps organizations design, build, and
                maintain accessible digital products. We translate standards into
                practical guidance teams can apply every day.
              </p>
              <p>
                Our work spans audits, inclusive design systems, content
                strategy, and assistive technology compatibility. We believe
                accessibility is a quality practice, not a one-time checklist.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-black px-8 py-3 text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl bg-[#ececec] p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-black sm:text-3xl">Our Mission</h2>
          <p className="mt-4 text-sm leading-8 text-neutral-700 sm:text-base">
            Our mission is to make accessibility achievable for every team. We
            provide resources, training, and implementation support that help
            organizations meet WCAG requirements while improving usability for
            everyone. From public sector services to product companies, we help
            teams embed inclusive practices into design, engineering, and
            content workflows.
          </p>
          <div className="mt-8 h-1 w-full rounded-full bg-[#c69762]" aria-hidden />
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl lg:grid-cols-2">
          <Image
            src={visionImage}
            alt="Team working together"
            width={640}
            height={480}
            className="h-full min-h-[280px] w-full object-cover"
          />
          <div className="flex flex-col justify-center bg-[#c69762] p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-black sm:text-3xl">Our Vision</h2>
            <p className="mt-4 text-sm leading-8 text-black sm:text-base">
              To create, connect, and embed accessibility around the globe.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-black sm:text-left sm:text-3xl">
            Core Values
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-bold text-black">Core Values</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                We build a community where accessibility knowledge is shared
                openly and teams learn from real implementation experience.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-black">Empower</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                We empower organizations through partnerships, training, and
                hands-on support that turns standards into everyday practice.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-black">Innovate</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                We innovate with technology and design patterns that remove
                barriers and improve access for people with diverse needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
