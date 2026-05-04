"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import RichPostEditor, {
  type RichPostValue,
} from "./components/RichPostEditor";

const styles = {
  page: "min-h-screen bg-[#e5e5e5]",
  panel: "min-h-screen w-full bg-[#f3f3f3] p-6 max-[760px]:p-[18px]",
  loginShell:
    "grid min-h-[calc(100vh-48px)] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_70px_rgba(15,47,71,0.16)] lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] max-[760px]:rounded-[20px]",
  loginHero:
    "relative flex min-h-[640px] flex-col justify-end overflow-hidden bg-[linear-gradient(135deg,rgba(15,47,71,0.96),rgba(20,40,56,0.78)),radial-gradient(circle_at_20%_20%,rgba(208,135,58,0.55),transparent_34%),url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center p-14 text-white before:pointer-events-none before:absolute before:inset-7 before:rounded-3xl before:border before:border-white/15 max-[1080px]:min-h-[420px] max-[760px]:min-h-[360px] max-[760px]:p-[34px] max-[760px]:before:inset-4 max-[760px]:before:rounded-[18px] [&>h1]:relative [&>h1]:m-0 [&>h1]:max-w-[720px] [&>h1]:text-[clamp(2.6rem,5vw,5rem)] [&>h1]:leading-[0.95] [&>h1]:tracking-[-0.06em] [&>p:not(.eyebrow)]:relative [&>p:not(.eyebrow)]:mt-5 [&>p:not(.eyebrow)]:max-w-[560px] [&>p:not(.eyebrow)]:text-[1.05rem] [&>p:not(.eyebrow)]:leading-[1.7] [&>p:not(.eyebrow)]:text-white/80",
  loginStats:
    "relative mt-7 flex flex-wrap gap-2.5 [&>span]:rounded-full [&>span]:border [&>span]:border-white/20 [&>span]:bg-white/10 [&>span]:px-[13px] [&>span]:py-[9px] [&>span]:text-[0.85rem] [&>span]:font-extrabold [&>span]:text-white",
  loginCard:
    "flex flex-col justify-center bg-white p-11 max-[760px]:p-7",
  loginCardHeader:
    "mb-3 flex items-start justify-between gap-[18px] max-[760px]:flex-col [&_h2]:m-0 [&_h2]:text-[clamp(2rem,4vw,2.7rem)] [&_h2]:leading-none [&_h2]:tracking-[-0.04em] [&_h2]:text-[#0f2f47]",
  loginHomeLink:
    "whitespace-nowrap rounded-full bg-[#eef3f8] px-[13px] py-[9px] text-[0.85rem] font-extrabold text-[#0f2f47] no-underline",
  loginForm:
    "mt-6 grid gap-4 [&_label]:grid [&_label]:gap-2 [&_label]:font-extrabold [&_label]:text-[#263746] [&_input]:w-full [&_input]:rounded-[14px] [&_input]:border [&_input]:border-[#c7d0d8] [&_input]:bg-[#f8fafc] [&_input]:px-4 [&_input]:py-[15px] [&_input]:font-medium [&_input]:text-[#172533] [&_input]:outline-none [&_input]:transition [&_input:focus]:border-[#d0873a] [&_input:focus]:bg-white [&_input:focus]:shadow-[0_0_0_4px_rgba(208,135,58,0.14)] [&_button]:mt-1 [&_button]:cursor-pointer [&_button]:rounded-[14px] [&_button]:border-0 [&_button]:bg-[#d0873a] [&_button]:px-[18px] [&_button]:py-[15px] [&_button]:font-black [&_button]:text-[#172533] [&_button]:shadow-[0_12px_24px_rgba(208,135,58,0.26)] disabled:[&_button]:cursor-not-allowed disabled:[&_button]:opacity-70",
  header:
    "flex justify-between gap-5 border-b border-[#dde3e8] pb-[18px] max-[760px]:flex-col [&_h1]:m-0 [&_h1]:text-[clamp(2rem,4vw,3rem)] [&_h1]:leading-[1.05] [&_h1]:text-[#0f2f47] [&_p:not(.eyebrow)]:mt-2.5 [&_p:not(.eyebrow)]:max-w-[640px] [&_p:not(.eyebrow)]:leading-[1.55] [&_p:not(.eyebrow)]:text-[#4a5966]",
  eyebrow:
    "eyebrow relative z-10 mb-1.5 text-[0.82rem] font-bold uppercase tracking-[0.08em] text-[#d0873a]",
  homeLink:
    "self-start rounded-full bg-[#0f2f47] px-4 py-2.5 font-bold text-white no-underline",
  alert: "mt-3.5 rounded-[10px] px-3.5 py-3 font-semibold",
  success: "border border-[#b8dfc4] bg-[#e8f5ec] text-[#1d6b37]",
  error: "border border-[#f4beb9] bg-[#fdeceb] text-[#9b2c25]",
  adminLayout:
    "mt-[22px] grid grid-cols-[260px_minmax(0,1fr)] gap-[22px] max-[1080px]:grid-cols-1",
  sidebar:
    "flex flex-col gap-2.5 rounded-xl border border-[#dce4eb] bg-white p-[18px] max-[760px]:static",
  sidebarTitle: "mb-2 text-[1.2rem] font-bold text-[#0f2f47]",
  navButton:
    "cursor-pointer rounded-[10px] border border-[#d4dde6] bg-[#f8fafc] px-3 py-[11px] text-left font-bold text-[#203242] hover:bg-[#eef3f8]",
  navButtonActive:
    "cursor-pointer rounded-[10px] border border-[#d0873a] bg-[#fef3e8] px-3 py-[11px] text-left font-bold text-[#8c571f]",
  sidebarActions:
    "mt-auto grid gap-2.5 [&_a]:self-stretch [&_a]:text-center",
  sidebarLogout:
    "cursor-pointer rounded-[10px] border-0 bg-[#e7edf2] px-3.5 py-2.5 font-bold text-[#0f2f47]",
  workspace:
    "rounded-xl border border-[#dce4eb] bg-white p-[22px]",
  workspaceHeader:
    "[&_h1]:m-0 [&_h1]:text-[clamp(1.7rem,2.4vw,2.3rem)] [&_h1]:text-[#0f2f47] [&_p]:mt-2 [&_p]:text-[#4a5966]",
  contentGrid:
    "grid grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] gap-5 max-[1080px]:grid-cols-1",
  form:
    "mt-[22px] grid gap-4 [&_label]:grid [&_label]:gap-2 [&_label]:font-bold [&_label]:text-[#263746] [&_input:not([type='checkbox'])]:w-full [&_select]:w-full [&_textarea]:w-full [&_input:not([type='checkbox'])]:rounded-[10px] [&_select]:rounded-[10px] [&_textarea]:rounded-[10px] [&_input:not([type='checkbox'])]:border [&_select]:border [&_textarea]:border [&_input:not([type='checkbox'])]:border-[#c7d0d8] [&_select]:border-[#c7d0d8] [&_textarea]:border-[#c7d0d8] [&_input:not([type='checkbox'])]:bg-white [&_select]:bg-white [&_textarea]:bg-white [&_input:not([type='checkbox'])]:px-3.5 [&_select]:px-3.5 [&_textarea]:px-3.5 [&_input:not([type='checkbox'])]:py-3 [&_select]:py-3 [&_textarea]:py-3 [&_input:not([type='checkbox'])]:font-normal [&_select]:font-normal [&_textarea]:font-normal [&_input:not([type='checkbox'])]:text-[#172533] [&_select]:text-[#172533] [&_textarea]:text-[#172533] [&_textarea]:resize-y [&>button]:cursor-pointer [&>button]:rounded-[10px] [&>button]:border-0 [&>button]:bg-[#d0873a] [&>button]:px-[18px] [&>button]:py-[13px] [&>button]:font-extrabold [&>button]:text-[#172533] disabled:[&>button]:cursor-not-allowed disabled:[&>button]:opacity-65",
  citationFields:
    "grid grid-cols-2 gap-3.5 max-[760px]:grid-cols-1",
  taxonomyPicker:
    "grid grid-cols-3 gap-3.5 max-[760px]:grid-cols-1",
  pillGrid: "mt-2 flex flex-wrap gap-2",
  pillCheck:
    "inline-flex items-center gap-[7px] rounded-full border border-[#d4dde6] bg-[#f8fafc] px-2.5 py-[7px] text-[0.9rem] font-bold text-[#203242] [&_input]:h-3.5 [&_input]:w-3.5",
  emptyInline: "m-0 text-[0.92rem] text-[#6b7880]",
  editorField: "grid gap-2.5",
  editorLabel: "font-bold text-[#263746]",
  editorHint: "mt-1.5 text-[0.92rem] text-[#64717c]",
  thumbnailField:
    "grid gap-3 rounded-xl border border-[#dce4eb] bg-[#f8fafc] p-3.5",
  thumbnailUrlField:
    "grid gap-2 font-bold text-[#263746] [&_input]:w-full [&_input]:rounded-[10px] [&_input]:border [&_input]:border-[#c7d0d8] [&_input]:bg-white [&_input]:px-3.5 [&_input]:py-3 [&_input]:font-normal [&_input]:text-[#172533]",
  thumbnailPreview:
    "w-[min(360px,100%)] overflow-hidden rounded-[10px] border border-[#d4dde6] bg-white [&_img]:block [&_img]:aspect-video [&_img]:w-full [&_img]:object-cover",
  uploadButton:
    "!mt-0 !w-full !rounded-[10px] !bg-[#d0873a] !text-[#172533] disabled:!bg-[#e0b488]",
  checkbox:
    "flex items-center gap-2.5 font-bold text-[#263746] [&_input]:h-[18px] [&_input]:w-[18px]",
  secondaryFormButton:
    "!bg-[#e7edf2] !text-[#0f2f47]",
  helpCard:
    "mt-[22px] rounded-xl border border-[#dce4eb] bg-white p-[18px] text-[#3d4b57] [&_h2]:mb-2.5 [&_h2]:text-[1.35rem] [&_h2]:text-[#0f2f47] [&_p]:leading-[1.55] [&_button]:mt-2 [&_button]:w-full [&_button]:rounded-[10px] [&_button]:border-0 [&_button]:bg-[#e7edf2] [&_button]:px-[18px] [&_button]:py-[13px] [&_button]:font-extrabold [&_button]:text-[#0f2f47]",
  contentList: "mt-[22px]",
  listHeader:
    "mb-5 flex items-center justify-between gap-5 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-3 [&_h2]:m-0 [&_h2]:text-[1.5rem] [&_h2]:text-[#0f2f47]",
  refreshButton:
    "cursor-pointer rounded-[10px] border-0 bg-[#e7edf2] px-4 py-2.5 font-bold text-[#0f2f47] disabled:cursor-not-allowed disabled:opacity-60 max-[760px]:w-full",
  loading: "py-10 text-center text-[1.05rem] text-[#4a5966]",
  emptyState: "py-10 text-center text-[1.05rem] text-[#4a5966]",
  articleGrid:
    "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 max-[1080px]:grid-cols-1",
  articleCard:
    "overflow-hidden rounded-xl border border-[#dce4eb] bg-white transition-shadow hover:shadow-[0_4px_12px_rgba(15,47,71,0.1)]",
  articleImage: "block h-[200px] w-full object-cover",
  articleContent: "p-4",
  articleMeta:
    "mb-2.5 flex items-center justify-between text-[0.85rem]",
  published:
    "rounded-md bg-[#e8f5ec] px-2.5 py-1 text-[0.75rem] font-bold uppercase tracking-[0.05em] text-[#1d6b37]",
  draft:
    "rounded-md bg-[#fef3e8] px-2.5 py-1 text-[0.75rem] font-bold uppercase tracking-[0.05em] text-[#a56b1f]",
  date: "text-[#6b7880]",
  articleTitle:
    "mb-2 text-[1.15rem] font-bold leading-[1.3] text-[#0f2f47]",
  articleSummary: "mb-3.5 text-[#4a5966]",
  articleActions: "flex flex-wrap gap-2",
  viewButton:
    "rounded-lg bg-[#e7edf2] px-3 py-2 text-sm font-bold text-[#0f2f47] no-underline",
  editButton:
    "cursor-pointer rounded-lg border-0 bg-[#d0873a] px-3 py-2 text-sm font-bold text-[#172533]",
  publishButton:
    "cursor-pointer rounded-lg border-0 bg-[#e8f5ec] px-3 py-2 text-sm font-bold text-[#1d6b37] disabled:cursor-not-allowed disabled:opacity-60",
  unpublishButton:
    "cursor-pointer rounded-lg border-0 bg-[#fef3e8] px-3 py-2 text-sm font-bold text-[#a56b1f] disabled:cursor-not-allowed disabled:opacity-60",
  deleteButton:
    "cursor-pointer rounded-lg border-0 bg-[#fdeceb] px-3 py-2 text-sm font-bold text-[#9b2c25]",
  taxonomyWorkspace:
    "mt-[22px] grid grid-cols-3 gap-5 max-[760px]:grid-cols-1",
  taxonomyPanel:
    "rounded-xl border border-[#dce4eb] bg-[#f8fafc] p-[18px] [&_h2]:mb-3.5 [&_h2]:text-[1.35rem] [&_h2]:text-[#0f2f47]",
  inlineCreateForm:
    "mb-3.5 grid grid-cols-[minmax(0,1fr)_auto] gap-2.5 [&_input]:rounded-[10px] [&_input]:border [&_input]:border-[#c7d0d8] [&_input]:px-3 [&_input]:py-[11px] [&_button]:cursor-pointer [&_button]:rounded-[10px] [&_button]:border-0 [&_button]:bg-[#d0873a] [&_button]:px-4 [&_button]:py-[11px] [&_button]:font-bold [&_button]:text-[#172533]",
  taxonomyList: "flex flex-wrap gap-2",
  taxonomyChip:
    "inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-bold text-[#203242] ring-1 ring-[#d4dde6]",
  taxonomyChipButton:
    "cursor-pointer rounded-full border-0 bg-[#e7edf2] px-2.5 py-1 text-xs font-bold text-[#0f2f47]",
  taxonomyEditForm:
    "grid w-full grid-cols-[minmax(0,1fr)_auto_auto] gap-2 rounded-xl bg-white p-2 ring-1 ring-[#d4dde6] [&_input]:min-w-0 [&_input]:rounded-[10px] [&_input]:border [&_input]:border-[#c7d0d8] [&_input]:px-3 [&_input]:py-2 [&_button]:cursor-pointer [&_button]:rounded-[10px] [&_button]:border-0 [&_button]:px-3 [&_button]:py-2 [&_button]:text-sm [&_button]:font-bold",
  taxonomySaveButton: "bg-[#d0873a] text-[#172533]",
  taxonomyCancelButton: "bg-[#e7edf2] text-[#0f2f47]",
} satisfies Record<string, string>;

type ArticleCategory = "article" | "news";

type LoginResponse = {
  token: string;
  admin: {
    id: string;
    email: string;
  };
};

type ApiErrorResponse = {
  message?: string;
};

type UploadedImage = {
  url: string;
  filename?: string;
};

type Article = {
  _id: string;
  title: string;
  category: ArticleCategory;
  image: string;
  summary: string;
  content: string[];
  contentJson?: Record<string, unknown>;
  images?: {
    url: string;
    alt?: string;
    caption?: string;
  }[];
  citation?: {
    text: string;
    url?: string;
  };
  postCategories?: ArticleTaxonomy[];
  tags?: ArticleTaxonomy[];
  countries?: ArticleTaxonomy[];
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

type TaxonomyItem = {
  _id: string;
  name: string;
  slug: string;
  type: "category" | "tag" | "country";
};

type ArticleTaxonomy = {
  id: string;
  name: string;
  slug: string;
};

type Tab = "create" | "articles" | "news" | "taxonomy";
type TaxonomyType = "category" | "tag" | "country";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const tokenStorageKey = "tribedart-admin-token";

const getErrorMessage = async (response: Response) => {
  try {
    const data = (await response.json()) as ApiErrorResponse;
    return data.message ?? "Request failed";
  } catch {
    return "Request failed";
  }
};

const createLegacyContentJson = (paragraphs: string[]) => ({
  type: "doc",
  content: paragraphs.map((paragraph) => ({
    type: "paragraph",
    content: paragraph
      ? [
          {
            type: "text",
            text: paragraph,
          },
        ]
      : [],
  })),
});

const getRichValueFromArticle = (article: Article): RichPostValue => ({
  json: article.contentJson ?? createLegacyContentJson(article.content),
  text: article.content.join("\n\n"),
  images:
    article.images?.map((image) => ({
      url: image.url,
      alt: image.alt ?? "",
      caption: image.caption ?? "",
    })) ?? [],
});

export default function AdminPage() {
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("admin@tribedart.com");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState<Tab>("create");
  const [articles, setArticles] = useState<Article[]>([]);
  const [news, setNews] = useState<Article[]>([]);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [updatingIds, setUpdatingIds] = useState<string[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [taxonomyCategories, setTaxonomyCategories] = useState<TaxonomyItem[]>([]);
  const [taxonomyTags, setTaxonomyTags] = useState<TaxonomyItem[]>([]);
  const [taxonomyCountries, setTaxonomyCountries] = useState<TaxonomyItem[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [newCountryName, setNewCountryName] = useState("");
  const [editingTaxonomyItem, setEditingTaxonomyItem] =
    useState<TaxonomyItem | null>(null);
  const [editingTaxonomyName, setEditingTaxonomyName] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [selectedCountryIds, setSelectedCountryIds] = useState<string[]>([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ArticleCategory>("article");
  const [summary, setSummary] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [citationText, setCitationText] = useState("");
  const [citationUrl, setCitationUrl] = useState("");
  const [richContent, setRichContent] = useState<RichPostValue | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const [published, setPublished] = useState(true);

  useEffect(() => {
    setToken(localStorage.getItem(tokenStorageKey) ?? "");
  }, []);

  useEffect(() => {
    if (token) {
      if (activeTab === "articles") {
        fetchArticles();
      } else if (activeTab === "news") {
        fetchNews();
      } else if (activeTab === "taxonomy") {
        void fetchTaxonomy();
      }
    }
  }, [token, activeTab]);

  useEffect(() => {
    if (token) {
      void fetchTaxonomy();
    }
  }, [token]);

  const fetchArticles = async () => {
    setIsLoadingContent(true);
    setError("");
    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/articles?category=article`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      const data = (await response.json()) as { articles: Article[] };
      setArticles(data.articles);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Unable to fetch articles",
      );
    } finally {
      setIsLoadingContent(false);
    }
  };

  const fetchNews = async () => {
    setIsLoadingContent(true);
    setError("");
    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/articles?category=news`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      const data = (await response.json()) as { articles: Article[] };
      setNews(data.articles);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error ? fetchError.message : "Unable to fetch news",
      );
    } finally {
      setIsLoadingContent(false);
    }
  };

  const fetchTaxonomy = async () => {
    try {
      const [categoriesResponse, tagsResponse, countriesResponse] = await Promise.all([
        fetch(`${apiBaseUrl}/api/admin/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${apiBaseUrl}/api/admin/tags`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${apiBaseUrl}/api/admin/countries`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!categoriesResponse.ok) {
        throw new Error(await getErrorMessage(categoriesResponse));
      }

      if (!tagsResponse.ok) {
        throw new Error(await getErrorMessage(tagsResponse));
      }

      if (!countriesResponse.ok) {
        throw new Error(await getErrorMessage(countriesResponse));
      }

      const categoriesData = (await categoriesResponse.json()) as {
        items: TaxonomyItem[];
      };
      const tagsData = (await tagsResponse.json()) as { items: TaxonomyItem[] };
      const countriesData = (await countriesResponse.json()) as {
        items: TaxonomyItem[];
      };

      setTaxonomyCategories(categoriesData.items);
      setTaxonomyTags(tagsData.items);
      setTaxonomyCountries(countriesData.items);
    } catch (taxonomyError) {
      setError(
        taxonomyError instanceof Error
          ? taxonomyError.message
          : "Unable to fetch categories, tags, and countries",
      );
    }
  };

  const createTaxonomyItem = async (
    type: TaxonomyType,
    name: string,
    reset: () => void,
  ) => {
    if (!name.trim()) {
      return;
    }

    setError("");

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/admin/${
          type === "category"
            ? "categories"
            : type === "country"
              ? "countries"
              : "tags"
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        },
      );

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      reset();
      await fetchTaxonomy();
      setMessage(
        `${type === "category" ? "Category" : type === "country" ? "Region" : "Tag"} created.`,
      );
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Unable to create taxonomy item",
      );
    }
  };

  const startEditingTaxonomyItem = (item: TaxonomyItem) => {
    setEditingTaxonomyItem(item);
    setEditingTaxonomyName(item.name);
    setError("");
    setMessage("");
  };

  const cancelEditingTaxonomyItem = () => {
    setEditingTaxonomyItem(null);
    setEditingTaxonomyName("");
  };

  const updateTaxonomyItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingTaxonomyItem || !editingTaxonomyName.trim()) {
      return;
    }

    const itemBeingEdited = editingTaxonomyItem;

    setError("");
    setMessage("");
    setUpdatingIds((current) => [...current, itemBeingEdited._id]);

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/admin/${itemBeingEdited.type}/${itemBeingEdited._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: editingTaxonomyName }),
        },
      );

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      const updatedType = itemBeingEdited.type;
      cancelEditingTaxonomyItem();
      await fetchTaxonomy();
      setMessage(
        `${updatedType === "category" ? "Category" : updatedType === "country" ? "Region" : "Tag"} updated.`,
      );
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Unable to update taxonomy item",
      );
    } finally {
      setUpdatingIds((current) =>
        current.filter((id) => id !== itemBeingEdited._id),
      );
    }
  };

  const resetEditorForm = () => {
    setEditingArticle(null);
    setTitle("");
    setCategory("article");
    setSummary("");
    setThumbnailImage("");
    setCitationText("");
    setCitationUrl("");
    setSelectedCategoryIds([]);
    setSelectedTagIds([]);
    setSelectedCountryIds([]);
    setRichContent(null);
    setEditorKey((currentKey) => currentKey + 1);
    setPublished(true);
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setTitle(article.title);
    setCategory(article.category);
    setSummary(article.summary);
    setThumbnailImage(article.image);
    setCitationText(article.citation?.text ?? "");
    setCitationUrl(article.citation?.url ?? "");
    setSelectedCategoryIds(
      article.postCategories?.map((item) => item.id) ?? [],
    );
    setSelectedTagIds(article.tags?.map((item) => item.id) ?? []);
    setSelectedCountryIds(article.countries?.map((item) => item.id) ?? []);
    setRichContent(getRichValueFromArticle(article));
    setPublished(article.published);
    setEditorKey((currentKey) => currentKey + 1);
    setMessage(`Editing ${article.category === "article" ? "article" : "news"}: ${article.title}`);
    setError("");
    setActiveTab("create");
  };

  const handleDelete = async (id: string, itemCategory: ArticleCategory) => {
    if (!confirm(`Are you sure you want to delete this ${itemCategory}?`)) {
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/articles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      setMessage(`${itemCategory === "article" ? "Guide" : "Update"} deleted successfully`);
      
      if (itemCategory === "article") {
        setArticles(articles.filter((a) => a._id !== id));
      } else {
        setNews(news.filter((n) => n._id !== id));
      }
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete content",
      );
    }
  };

  const handleTogglePublished = async (
    id: string,
    itemCategory: ArticleCategory,
    nextPublished: boolean,
  ) => {
    setUpdatingIds((prev) => [...prev, id]);
    setError("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/articles/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ published: nextPublished }),
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      if (itemCategory === "article") {
        setArticles((prev) =>
          prev.map((article) =>
            article._id === id
              ? { ...article, published: nextPublished }
              : article,
          ),
        );
      } else {
        setNews((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, published: nextPublished } : item,
          ),
        );
      }

      setMessage(
        `${itemCategory === "article" ? "Guide" : "Update"} marked as ${nextPublished ? "published" : "draft"}.`,
      );
    } catch (toggleError) {
      setError(
        toggleError instanceof Error
          ? toggleError.message
          : "Unable to update publish status",
      );
    } finally {
      setUpdatingIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const uploadThumbnail = async (files: FileList | null) => {
    const file = files?.[0];

    if (!file) {
      return;
    }

    setIsUploadingThumbnail(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${apiBaseUrl}/api/upload/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      const image = (await response.json()) as UploadedImage;
      setThumbnailImage(image.url);
      setMessage("Thumbnail uploaded. Save the content to apply it.");
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload thumbnail",
      );
    } finally {
      setIsUploadingThumbnail(false);
      if (thumbnailInputRef.current) {
        thumbnailInputRef.current.value = "";
      }
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsLoggingIn(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      const data = (await response.json()) as LoginResponse;
      localStorage.setItem(tokenStorageKey, data.token);
      setToken(data.token);
      setPassword("");
      setMessage(`Logged in as ${data.admin.email}`);
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Unable to log in",
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleCreateArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const paragraphs = (richContent?.text ?? "")
        .split(/\n+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
      const selectedPostCategories = taxonomyCategories
        .filter((item) => selectedCategoryIds.includes(item._id))
        .map((item) => ({
          id: item._id,
          name: item.name,
          slug: item.slug,
        }));
      const selectedTags = taxonomyTags
        .filter((item) => selectedTagIds.includes(item._id))
        .map((item) => ({
          id: item._id,
          name: item.name,
          slug: item.slug,
        }));
      const selectedCountries = taxonomyCountries
        .filter((item) => selectedCountryIds.includes(item._id))
        .map((item) => ({
          id: item._id,
          name: item.name,
          slug: item.slug,
        }));
      const thumbnail = thumbnailImage.trim();
      const imageMetadata = richContent?.images ?? [];

      if (!richContent || !paragraphs.length) {
        setError("Write article content before submitting.");
        setIsSubmitting(false);
        return;
      }

      if (!thumbnail) {
        setError("Upload a thumbnail image before submitting.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(
        editingArticle
          ? `${apiBaseUrl}/api/admin/articles/${editingArticle._id}`
          : `${apiBaseUrl}/api/admin/articles`,
        {
        method: editingArticle ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          category,
          image: thumbnail,
          summary,
          content: paragraphs,
          contentJson: richContent.json,
          images: imageMetadata,
          citation: citationText.trim()
            ? {
                text: citationText.trim(),
                ...(citationUrl.trim() ? { url: citationUrl.trim() } : {}),
              }
            : undefined,
          postCategories: selectedPostCategories,
          tags: selectedTags,
          countries: selectedCountries,
          published,
        }),
        },
      );

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      const savedCategory = category;
      const wasEditing = Boolean(editingArticle);
      const previousCategory = editingArticle?.category;
      resetEditorForm();
      setMessage(
        `${savedCategory === "article" ? "Guide" : "Update"} ${wasEditing ? "updated" : "created"} successfully.`,
      );
      
      if (wasEditing) {
        if (previousCategory === "article" || savedCategory === "article") {
          void fetchArticles();
        }

        if (previousCategory === "news" || savedCategory === "news") {
          void fetchNews();
        }
      } else if (savedCategory === "article") {
        void fetchArticles();
      } else {
        void fetchNews();
      }
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Unable to create content",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(tokenStorageKey);
    setToken("");
    setMessage("Logged out");
    setError("");
  };

  const renderTaxonomyItems = (items: TaxonomyItem[], emptyMessage: string) => {
    if (!items.length) {
      return <p className={styles.emptyInline}>{emptyMessage}</p>;
    }

    return items.map((item) =>
      editingTaxonomyItem?._id === item._id ? (
        <form
          key={item._id}
          className={styles.taxonomyEditForm}
          onSubmit={updateTaxonomyItem}
        >
          <input
            type="text"
            value={editingTaxonomyName}
            onChange={(event) => setEditingTaxonomyName(event.target.value)}
            minLength={2}
            required
            autoFocus
          />
          <button
            type="submit"
            className={styles.taxonomySaveButton}
            disabled={updatingIds.includes(item._id)}
          >
            {updatingIds.includes(item._id) ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className={styles.taxonomyCancelButton}
            onClick={cancelEditingTaxonomyItem}
            disabled={updatingIds.includes(item._id)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <span key={item._id} className={styles.taxonomyChip}>
          {item.name}
          <button
            type="button"
            className={styles.taxonomyChipButton}
            onClick={() => startEditingTaxonomyItem(item)}
          >
            Edit
          </button>
        </span>
      ),
    );
  };

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        {!token ? (
          <div className={styles.loginShell}>
            <section className={styles.loginHero}>
              <p className={styles.eyebrow}>innov8ive Solutions Admin</p>
              <h1>Manage accessibility resources with confidence.</h1>
              <p>
                Publish guides, updates, regions, categories, tags, images, and
                sources from one focused editorial workspace.
              </p>
              <div className={styles.loginStats}>
                <span>Guides</span>
                <span>Updates</span>
                <span>Regions</span>
              </div>
            </section>

            <section className={styles.loginCard}>
              <div className={styles.loginCardHeader}>
                <div>
                  <p className={styles.eyebrow}>Welcome back</p>
                  <h2>Sign in to continue</h2>
                </div>
                <Link href="/" className={styles.loginHomeLink}>
                  View Site
                </Link>
              </div>
              {message ? (
                <p className={`${styles.alert} ${styles.success}`}>{message}</p>
              ) : null}
              {error ? (
                <p className={`${styles.alert} ${styles.error}`}>{error}</p>
              ) : null}
              <form className={styles.loginForm} onSubmit={handleLogin}>
                <label>
                  Email address
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                </label>
                <button type="submit" disabled={isLoggingIn}>
                  {isLoggingIn ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </section>
          </div>
        ) : (
          <div className={styles.adminLayout}>
            <aside className={styles.sidebar}>
              <p className={styles.eyebrow}>innov8ive Solutions Admin</p>
              <h2 className={styles.sidebarTitle}>Workspace</h2>
              <button
                type="button"
                className={
                  activeTab === "create" ? styles.navButtonActive : styles.navButton
                }
                onClick={() => {
                  resetEditorForm();
                  setActiveTab("create");
                }}
              >
                Create Content
              </button>
              <button
                type="button"
                className={
                  activeTab === "articles"
                    ? styles.navButtonActive
                    : styles.navButton
                }
                onClick={() => setActiveTab("articles")}
              >
                Manage Guides
              </button>
              <button
                type="button"
                className={
                  activeTab === "news" ? styles.navButtonActive : styles.navButton
                }
                onClick={() => setActiveTab("news")}
              >
                Manage Updates
              </button>
              <button
                type="button"
                className={
                  activeTab === "taxonomy"
                    ? styles.navButtonActive
                    : styles.navButton
                }
                onClick={() => setActiveTab("taxonomy")}
              >
                Categories, Tags & Regions
              </button>

              <div className={styles.sidebarActions}>
                <Link href="/" className={styles.homeLink}>
                  View Site
                </Link>
                <button type="button" className={styles.sidebarLogout} onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </aside>

            <section className={styles.workspace}>
              <div className={styles.workspaceHeader}>
                <h1>
                  {activeTab === "create"
                    ? editingArticle
                      ? "Edit Guide or Update"
                      : "Create Guides or Updates"
                    : activeTab === "articles"
                      ? "Manage Guides"
                      : activeTab === "news"
                        ? "Manage Updates"
                        : "Categories, Tags & Regions"}
                </h1>
                <p>
                  {activeTab === "create"
                    ? editingArticle
                      ? "Update the selected post. Changes apply after you save."
                      : "Create content and choose whether it should be published immediately."
                    : activeTab === "taxonomy"
                      ? "Create reusable categories, tags, and regions for optional post organization."
                      : "Review existing posts, edit them, publish/unpublish them, or delete them."}
                </p>
              </div>

              {message ? (
                <p className={`${styles.alert} ${styles.success}`}>{message}</p>
              ) : null}
              {error ? (
                <p className={`${styles.alert} ${styles.error}`}>{error}</p>
              ) : null}

              {activeTab === "create" && (
                <div className={styles.contentGrid}>
                  <form className={styles.form} onSubmit={handleCreateArticle}>
                    <label>
                      Content Type
                      <select
                        value={category}
                        onChange={(event) =>
                          setCategory(event.target.value as ArticleCategory)
                        }
                      >
                        <option value="article">Accessibility Guide</option>
                        <option value="news">Accessibility Update</option>
                      </select>
                    </label>
                    <label>
                      Title
                      <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        minLength={3}
                        required
                      />
                    </label>
                    <label>
                      Summary
                      <textarea
                        value={summary}
                        onChange={(event) => setSummary(event.target.value)}
                        rows={3}
                        minLength={10}
                        required
                      />
                    </label>
                    <div className={styles.thumbnailField}>
                      <input
                        ref={thumbnailInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        hidden
                        onChange={(event) => uploadThumbnail(event.target.files)}
                      />
                      <div>
                        <span className={styles.editorLabel}>Thumbnail</span>
                        <p className={styles.editorHint}>
                          This image appears on cards and can appear at the top
                          of the detail page. Upload one or paste an image URL.
                        </p>
                      </div>
                      <label className={styles.thumbnailUrlField}>
                        Thumbnail image URL
                        <input
                          type="url"
                          value={thumbnailImage}
                          onChange={(event) =>
                            setThumbnailImage(event.target.value)
                          }
                          placeholder="https://example.com/thumbnail.jpg"
                        />
                      </label>
                      {thumbnailImage ? (
                        <div className={styles.thumbnailPreview}>
                          <img src={thumbnailImage} alt="Current thumbnail" />
                        </div>
                      ) : null}
                      <button
                        type="button"
                        className={styles.uploadButton}
                        onClick={() => thumbnailInputRef.current?.click()}
                        disabled={isUploadingThumbnail}
                      >
                        {isUploadingThumbnail
                          ? "Uploading thumbnail..."
                          : thumbnailImage
                            ? "Change thumbnail"
                            : "Upload thumbnail"}
                      </button>
                    </div>
                    <div className={styles.citationFields}>
                      <label>
                        Citation / Source
                        <input
                          type="text"
                          value={citationText}
                          onChange={(event) => setCitationText(event.target.value)}
                          placeholder="e.g. WCAG 2.2 guidance, 2026"
                        />
                      </label>
                      <label>
                        Citation URL
                        <input
                          type="url"
                          value={citationUrl}
                          onChange={(event) => setCitationUrl(event.target.value)}
                          placeholder="https://example.com/source"
                        />
                      </label>
                    </div>
                    <div className={styles.taxonomyPicker}>
                      <div>
                        <span className={styles.editorLabel}>Categories (optional)</span>
                        <div className={styles.pillGrid}>
                          {taxonomyCategories.length ? (
                            taxonomyCategories.map((item) => (
                              <label key={item._id} className={styles.pillCheck}>
                                <input
                                  type="checkbox"
                                  checked={selectedCategoryIds.includes(item._id)}
                                  onChange={(event) =>
                                    setSelectedCategoryIds((current) =>
                                      event.target.checked
                                        ? [...current, item._id]
                                        : current.filter((id) => id !== item._id),
                                    )
                                  }
                                />
                                {item.name}
                              </label>
                            ))
                          ) : (
                            <p className={styles.emptyInline}>
                              No categories yet. Create them in Categories & Tags.
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className={styles.editorLabel}>Tags (optional)</span>
                        <div className={styles.pillGrid}>
                          {taxonomyTags.length ? (
                            taxonomyTags.map((item) => (
                              <label key={item._id} className={styles.pillCheck}>
                                <input
                                  type="checkbox"
                                  checked={selectedTagIds.includes(item._id)}
                                  onChange={(event) =>
                                    setSelectedTagIds((current) =>
                                      event.target.checked
                                        ? [...current, item._id]
                                        : current.filter((id) => id !== item._id),
                                    )
                                  }
                                />
                                {item.name}
                              </label>
                            ))
                          ) : (
                            <p className={styles.emptyInline}>
                              No tags yet. Create them in Categories & Tags.
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className={styles.editorLabel}>Regions (optional)</span>
                        <div className={styles.pillGrid}>
                          {taxonomyCountries.length ? (
                            taxonomyCountries.map((item) => (
                              <label key={item._id} className={styles.pillCheck}>
                                <input
                                  type="checkbox"
                                  checked={selectedCountryIds.includes(item._id)}
                                  onChange={(event) =>
                                    setSelectedCountryIds((current) =>
                                      event.target.checked
                                        ? [...current, item._id]
                                        : current.filter((id) => id !== item._id),
                                    )
                                  }
                                />
                                {item.name}
                              </label>
                            ))
                          ) : (
                            <p className={styles.emptyInline}>
                              No regions yet. Create them in Categories, Tags & Regions.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.editorField}>
                      <div>
                        <span className={styles.editorLabel}>Content</span>
                        <p className={styles.editorHint}>
                          Use the editor upload button only for images that
                          should appear inside the resource body.
                        </p>
                      </div>
                      <RichPostEditor
                        key={editorKey}
                        token={token}
                        apiBaseUrl={apiBaseUrl}
                        value={richContent}
                        onChange={setRichContent}
                        onError={setError}
                      />
                    </div>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={published}
                        onChange={(event) => setPublished(event.target.checked)}
                      />
                      Publish immediately
                    </label>
                    {editingArticle ? (
                      <button
                        type="button"
                        className={styles.secondaryFormButton}
                        onClick={resetEditorForm}
                      >
                        Cancel Edit
                      </button>
                    ) : null}
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting
                        ? editingArticle
                          ? "Updating..."
                          : "Publishing..."
                        : editingArticle
                          ? "Update Content"
                          : "Create Content"}
                    </button>
                  </form>

                  <aside className={styles.helpCard}>
                    <h2>How it works</h2>
                    <p>
                      Choose <strong>Accessibility Guide</strong> to show in
                      Featured Accessibility Guides, or{" "}
                      <strong>Accessibility Update</strong> to show in Latest
                      Accessibility Updates.
                    </p>
                    <p>
                      You can set initial status with the publish checkbox, then toggle
                      publish state later from the manage views.
                    </p>
                  </aside>
                </div>
              )}

              {activeTab === "articles" && (
                <div className={styles.contentList}>
                  <div className={styles.listHeader}>
                    <h2>Featured Accessibility Guides</h2>
                    <button
                      type="button"
                      onClick={fetchArticles}
                      className={styles.refreshButton}
                      disabled={isLoadingContent}
                    >
                      {isLoadingContent ? "Loading..." : "Refresh"}
                    </button>
                  </div>
                  {isLoadingContent ? (
                    <p className={styles.loading}>Loading guides...</p>
                  ) : articles.length === 0 ? (
                    <p className={styles.emptyState}>No guides found. Create your first guide!</p>
                  ) : (
                    <div className={styles.articleGrid}>
                      {articles.map((article) => (
                        <article key={article._id} className={styles.articleCard}>
                          <img src={article.image} alt={article.title} className={styles.articleImage} />
                          <div className={styles.articleContent}>
                            <div className={styles.articleMeta}>
                              <span className={article.published ? styles.published : styles.draft}>
                                {article.published ? "Published" : "Draft"}
                              </span>
                              <span className={styles.date}>
                                {new Date(article.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className={styles.articleTitle}>{article.title}</h3>
                            <p className={styles.articleSummary}>{article.summary}</p>
                            <div className={styles.articleActions}>
                              <Link href={`/articles/${article.slug}`} className={styles.viewButton} target="_blank">
                                View
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleEditArticle(article)}
                                className={styles.editButton}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleTogglePublished(article._id, "article", !article.published)
                                }
                                className={article.published ? styles.unpublishButton : styles.publishButton}
                                disabled={updatingIds.includes(article._id)}
                              >
                                {updatingIds.includes(article._id)
                                  ? "Saving..."
                                  : article.published
                                    ? "Unpublish"
                                    : "Publish"}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(article._id, "article")}
                                className={styles.deleteButton}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "news" && (
                <div className={styles.contentList}>
                  <div className={styles.listHeader}>
                    <h2>Accessibility Updates</h2>
                    <button
                      type="button"
                      onClick={fetchNews}
                      className={styles.refreshButton}
                      disabled={isLoadingContent}
                    >
                      {isLoadingContent ? "Loading..." : "Refresh"}
                    </button>
                  </div>
                  {isLoadingContent ? (
                    <p className={styles.loading}>Loading updates...</p>
                  ) : news.length === 0 ? (
                    <p className={styles.emptyState}>No updates found. Create your first update!</p>
                  ) : (
                    <div className={styles.articleGrid}>
                      {news.map((newsItem) => (
                        <article key={newsItem._id} className={styles.articleCard}>
                          <img src={newsItem.image} alt={newsItem.title} className={styles.articleImage} />
                          <div className={styles.articleContent}>
                            <div className={styles.articleMeta}>
                              <span className={newsItem.published ? styles.published : styles.draft}>
                                {newsItem.published ? "Published" : "Draft"}
                              </span>
                              <span className={styles.date}>
                                {new Date(newsItem.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className={styles.articleTitle}>{newsItem.title}</h3>
                            <p className={styles.articleSummary}>{newsItem.summary}</p>
                            <div className={styles.articleActions}>
                              <Link href={`/news/${newsItem.slug}`} className={styles.viewButton} target="_blank">
                                View
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleEditArticle(newsItem)}
                                className={styles.editButton}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleTogglePublished(newsItem._id, "news", !newsItem.published)
                                }
                                className={newsItem.published ? styles.unpublishButton : styles.publishButton}
                                disabled={updatingIds.includes(newsItem._id)}
                              >
                                {updatingIds.includes(newsItem._id)
                                  ? "Saving..."
                                  : newsItem.published
                                    ? "Unpublish"
                                    : "Publish"}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(newsItem._id, "news")}
                                className={styles.deleteButton}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "taxonomy" && (
                <div className={styles.taxonomyWorkspace}>
                  <section className={styles.taxonomyPanel}>
                    <h2>Categories</h2>
                    <form
                      className={styles.inlineCreateForm}
                      onSubmit={(event) => {
                        event.preventDefault();
                        void createTaxonomyItem("category", newCategoryName, () =>
                          setNewCategoryName(""),
                        );
                      }}
                    >
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(event) => setNewCategoryName(event.target.value)}
                        placeholder="Create category"
                      />
                      <button type="submit">Add</button>
                    </form>
                    <div className={styles.taxonomyList}>
                      {renderTaxonomyItems(
                        taxonomyCategories,
                        "No categories created yet.",
                      )}
                    </div>
                  </section>

                  <section className={styles.taxonomyPanel}>
                    <h2>Tags</h2>
                    <form
                      className={styles.inlineCreateForm}
                      onSubmit={(event) => {
                        event.preventDefault();
                        void createTaxonomyItem("tag", newTagName, () =>
                          setNewTagName(""),
                        );
                      }}
                    >
                      <input
                        type="text"
                        value={newTagName}
                        onChange={(event) => setNewTagName(event.target.value)}
                        placeholder="Create tag"
                      />
                      <button type="submit">Add</button>
                    </form>
                    <div className={styles.taxonomyList}>
                      {renderTaxonomyItems(taxonomyTags, "No tags created yet.")}
                    </div>
                  </section>

                  <section className={styles.taxonomyPanel}>
                    <h2>Regions</h2>
                    <form
                      className={styles.inlineCreateForm}
                      onSubmit={(event) => {
                        event.preventDefault();
                        void createTaxonomyItem("country", newCountryName, () =>
                          setNewCountryName(""),
                        );
                      }}
                    >
                      <input
                        type="text"
                        value={newCountryName}
                        onChange={(event) => setNewCountryName(event.target.value)}
                        placeholder="Create region"
                      />
                      <button type="submit">Add</button>
                    </form>
                    <div className={styles.taxonomyList}>
                      {renderTaxonomyItems(
                        taxonomyCountries,
                        "No regions created yet.",
                      )}
                    </div>
                  </section>
                </div>
              )}
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
