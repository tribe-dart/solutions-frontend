import ContentListing from "../components/content-listing";
import { getPaginatedContent } from "../content";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

const parsePage = (value?: string) => {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
};

export default async function ArticlesPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const page = parsePage(pageParam);
  const { articles, pagination } = await getPaginatedContent({
    category: "article",
    page,
    limit: 9,
  });
  const currentPage = Math.min(pagination.page, pagination.totalPages);

  return (
    <ContentListing
      title="Accessibility Guides"
      description="Explore practical guidance on inclusive design, accessible content, assistive technology, and product delivery."
      label="Accessibility Guide"
      items={articles}
      basePath="/articles"
      detailPath="/articles"
      currentPage={currentPage}
      totalPages={pagination.totalPages}
      total={pagination.total}
    />
  );
}
