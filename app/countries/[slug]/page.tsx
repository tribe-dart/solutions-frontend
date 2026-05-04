import { notFound } from "next/navigation";
import ContentListing from "../../components/content-listing";
import { getPaginatedContent, getPublishedTaxonomy } from "../../content";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

const parsePage = (value?: string) => {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
};

export async function generateStaticParams() {
  const countries = await getPublishedTaxonomy("country");

  return countries.map((country) => ({ slug: country.slug }));
}

export default async function CountryPage({ params, searchParams }: PageProps) {
  const [{ slug }, { page: pageParam }] = await Promise.all([
    params,
    searchParams,
  ]);
  const page = parsePage(pageParam);
  const [countries, content] = await Promise.all([
    getPublishedTaxonomy("country"),
    getPaginatedContent({ country: slug, page, limit: 9 }),
  ]);
  const country = countries.find((item) => item.slug === slug);

  if (!country) {
    notFound();
  }

  return (
    <ContentListing
      title={country.name}
      description={`Accessibility resources attached to ${country.name}.`}
      label="Region"
      items={content.articles}
      basePath={`/countries/${slug}`}
      currentPage={Math.min(
        content.pagination.page,
        content.pagination.totalPages,
      )}
      totalPages={content.pagination.totalPages}
      total={content.pagination.total}
    />
  );
}
