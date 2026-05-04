import ContentListing from "../components/content-listing";
import { getPaginatedContent } from "../content";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

const parsePage = (value?: string) => {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
};

export default async function NewsPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const page = parsePage(pageParam);
  const { articles, pagination } = await getPaginatedContent({
    category: "news",
    page,
    limit: 9,
  });
  const currentPage = Math.min(pagination.page, pagination.totalPages);

  return (
    <ContentListing
      title="Accessibility Updates"
      description="Catch up on accessibility standards, inclusive product practices, and assistive technology developments."
      label="Accessibility Update"
      items={articles}
      basePath="/news"
      detailPath="/news"
      currentPage={currentPage}
      totalPages={pagination.totalPages}
      total={pagination.total}
    />
  );
}
