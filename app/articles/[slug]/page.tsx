import { notFound } from "next/navigation";
import DetailPageLayout from "../../components/detail-page-layout";
import {
  getArticleBySlug,
  getFeaturedArticles,
  getPublishedTaxonomy,
} from "../../content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const featuredArticles = await getFeaturedArticles();

  return featuredArticles.map((article) => ({ slug: article.slug }));
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug, "article");

  if (!article) {
    notFound();
  }

  const [relatedArticles, sidebarCategories, sidebarCountries] =
    await Promise.all([
      getFeaturedArticles(),
      getPublishedTaxonomy("category"),
      getPublishedTaxonomy("country"),
    ]);

  return (
    <DetailPageLayout
      item={article}
      label="Accessibility Guide"
      detailPath="/articles"
      relatedItems={relatedArticles}
      sidebarCategories={sidebarCategories}
      sidebarCountries={sidebarCountries}
    />
  );
}
