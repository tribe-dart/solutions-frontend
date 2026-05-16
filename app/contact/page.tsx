import ContactForm from "../components/contact-form";
import FeaturedArticlesStrip from "../components/featured-articles-strip";
import PageHero from "../components/page-hero";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { getFeaturedArticles } from "../content";

export default async function ContactPage() {
  const featuredArticles = await getFeaturedArticles();

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader active="contact" />
      <PageHero title="Contact Us" />

      <section className="px-4 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-sm text-neutral-600">We are here to help you</p>
            <h2 className="mt-2 text-3xl font-bold text-black sm:text-4xl">
              Get In Touch With Us
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-neutral-700 sm:text-base">
              Have a question about accessibility, partnerships, or editorial
              contributions? Send us a message and our team will respond within
              24 hours.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#c69762] text-lg text-black">
                  ✉
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Email
                  </p>
                  <p className="mt-1 text-sm font-semibold text-black">
                    hello@innov8ive.solutions
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#c69762] text-lg text-black">
                  ☎
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-semibold text-black">
                    1-888-666-6456
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <ContactForm />
        </div>
      </section>

      <FeaturedArticlesStrip articles={featuredArticles} />
      <SiteFooter />
    </div>
  );
}
