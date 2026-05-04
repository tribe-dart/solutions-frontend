import { notFound } from "next/navigation";
import DetailPageLayout from "../../components/detail-page-layout";
import {
  getArticleBySlug,
  getLatestNews,
  getPublishedTaxonomy,
} from "../../content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const latestNews = await getLatestNews();

  return latestNews.map((news) => ({ slug: news.slug }));
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const news = await getArticleBySlug(slug, "news");

  if (!news) {
    notFound();
  }

  const [relatedNews, sidebarCategories, sidebarCountries] = await Promise.all([
    getLatestNews(),
    getPublishedTaxonomy("category"),
    getPublishedTaxonomy("country"),
  ]);

  return (
    <DetailPageLayout
      item={news}
      label="Accessibility Update"
      detailPath="/news"
      relatedItems={relatedNews}
      sidebarCategories={sidebarCategories}
      sidebarCountries={sidebarCountries}
    />
  );
}
