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
  const categories = await getPublishedTaxonomy("category");

  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const [{ slug }, { page: pageParam }] = await Promise.all([
    params,
    searchParams,
  ]);
  const page = parsePage(pageParam);
  const [categories, content] = await Promise.all([
    getPublishedTaxonomy("category"),
    getPaginatedContent({ postCategory: slug, page, limit: 9 }),
  ]);
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <ContentListing
      title={category.name}
      description={`Accessibility resources attached to the ${category.name} category.`}
      label="Category"
      items={content.articles}
      basePath={`/categories/${slug}`}
      currentPage={Math.min(
        content.pagination.page,
        content.pagination.totalPages,
      )}
      totalPages={content.pagination.totalPages}
      total={content.pagination.total}
    />
  );
}
