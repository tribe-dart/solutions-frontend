import ContentListing from "../components/content-listing";
import { getPaginatedContent, getPublishedTaxonomy } from "../content";

type SearchPageProps = {
  searchParams: Promise<{
    country?: string;
    page?: string;
    q?: string;
  }>;
};

const parsePage = (value?: string) => {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
};

const getSearchBasePath = (query?: string, country?: string) => {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (country) {
    params.set("country", country);
  }

  const queryString = params.toString();

  return queryString ? `/search?${queryString}` : "/search";
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { country: countryParam, page: pageParam, q } = await searchParams;
  const query = q?.trim();
  const page = parsePage(pageParam);
  const countries = await getPublishedTaxonomy("country");
  const selectedCountry = countries.find(
    (country) => country.slug === countryParam,
  );
  const country = selectedCountry?.slug;
  const content =
    query || country
      ? await getPaginatedContent({
          country,
          query,
          page,
          limit: 9,
        })
      : {
          articles: [],
          pagination: {
            page,
            limit: 9,
            total: 0,
            totalPages: 1,
          },
        };
  const currentPage = Math.min(
    content.pagination.page,
    content.pagination.totalPages,
  );
  const countryCopy = selectedCountry ? ` in ${selectedCountry.name}` : "";
  const queryCopy = query ? ` for "${query}"` : "";

  return (
    <ContentListing
      title="Search Results"
      description={`Showing accessibility guide and update matches${queryCopy}${countryCopy}.`}
      label="Search Result"
      items={content.articles}
      basePath={getSearchBasePath(query, country)}
      currentPage={currentPage}
      totalPages={content.pagination.totalPages}
      total={content.pagination.total}
      emptyMessage="No accessibility resources matched this search."
    />
  );
}
