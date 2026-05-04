export type Innov8iveItem = {
  _id?: string;
  slug: string;
  title: string;
  category?: "article" | "news";
  image: string;
  summary: string;
  content: string[];
  createdAt?: string;
  contentJson?: {
    type: string;
    content?: unknown[];
  };
  images?: {
    url: string;
    alt?: string;
    caption?: string;
  }[];
  citation?: {
    text: string;
    url?: string;
  };
  postCategories?: {
    id: string;
    name: string;
    slug: string;
  }[];
  tags?: {
    id: string;
    name: string;
    slug: string;
  }[];
  countries?: {
    id: string;
    name: string;
    slug: string;
  }[];
};

export type TaxonomySummary = {
  id: string;
  name: string;
  slug: string;
  count: number;
};

type ArticleListResponse = {
  articles: Innov8iveItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type ArticleDetailResponse = {
  article: Innov8iveItem;
};

type TaxonomySummaryResponse = {
  items: TaxonomySummary[];
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const accessibilityContent: Innov8iveItem[] = [
  {
    _id: "guide-inclusive-audits",
    slug: "how-inclusive-audits-improve-every-digital-journey",
    title: "How inclusive audits improve every digital journey",
    category: "article",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A practical look at how accessibility reviews reveal barriers before they become everyday user frustrations.",
    content: [
      "Accessibility audits work best when they combine automated checks, manual review, and feedback from people who use assistive technology every day.",
      "Teams should test keyboard paths, form errors, headings, color contrast, focus states, and content structure alongside the visual experience.",
      "The goal is not only compliance. A strong audit gives product teams a shared roadmap for building services that more people can use with confidence.",
    ],
    createdAt: "2026-04-30T09:00:00.000Z",
    postCategories: [
      { id: "cat-inclusive-design", name: "Inclusive Design", slug: "inclusive-design" },
    ],
    tags: [
      { id: "tag-audit", name: "Audits", slug: "audits" },
      { id: "tag-wcag", name: "WCAG", slug: "wcag" },
    ],
    countries: [{ id: "global", name: "Global", slug: "global" }],
  },
  {
    _id: "guide-keyboard-first",
    slug: "keyboard-first-design-for-faster-more-accessible-products",
    title: "Keyboard-first design for faster, more accessible products",
    category: "article",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Designing complete keyboard flows helps screen reader users, power users, and anyone navigating without a pointer.",
    content: [
      "Keyboard-first design starts with visible focus, logical tab order, and controls that behave like users expect.",
      "Menus, dialogs, skip links, and custom widgets need the same care as the main page content because they often block critical tasks.",
      "When teams test without a mouse early, they catch interaction problems long before release.",
    ],
    createdAt: "2026-04-26T09:00:00.000Z",
    postCategories: [
      { id: "cat-product-practice", name: "Product Practice", slug: "product-practice" },
    ],
    tags: [{ id: "tag-keyboard", name: "Keyboard", slug: "keyboard" }],
    countries: [{ id: "global", name: "Global", slug: "global" }],
  },
  {
    _id: "guide-alt-text",
    slug: "writing-alt-text-that-gives-images-a-clear-purpose",
    title: "Writing alt text that gives images a clear purpose",
    category: "article",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Useful image descriptions depend on context, brevity, and the reason an image appears on the page.",
    content: [
      "Good alt text explains the information an image contributes, not every visible detail.",
      "Decorative images should stay silent, while charts, diagrams, and product screenshots often need adjacent explanatory text.",
      "Editors can improve quality by asking one question: what would someone miss if this image did not load or could not be seen?",
    ],
    createdAt: "2026-04-22T09:00:00.000Z",
    postCategories: [
      { id: "cat-content", name: "Accessible Content", slug: "accessible-content" },
    ],
    tags: [{ id: "tag-alt-text", name: "Alt Text", slug: "alt-text" }],
    countries: [{ id: "global", name: "Global", slug: "global" }],
  },
  {
    _id: "guide-contrast",
    slug: "color-contrast-choices-that-support-readable-interfaces",
    title: "Color contrast choices that support readable interfaces",
    category: "article",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Contrast is a design system decision that affects readability, brand expression, and user trust.",
    content: [
      "Readable interfaces depend on enough contrast between text, controls, icons, and their backgrounds.",
      "Design tokens make contrast easier to preserve as teams add new components and states.",
      "Testing palettes in bright light, dark mode, and high-contrast settings helps teams design beyond the ideal screen.",
    ],
    createdAt: "2026-04-18T09:00:00.000Z",
    postCategories: [
      { id: "cat-design-systems", name: "Design Systems", slug: "design-systems" },
    ],
    tags: [{ id: "tag-contrast", name: "Contrast", slug: "contrast" }],
    countries: [{ id: "global", name: "Global", slug: "global" }],
  },
  {
    _id: "guide-forms",
    slug: "accessible-form-patterns-that-reduce-user-errors",
    title: "Accessible form patterns that reduce user errors",
    category: "article",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Clear labels, helpful errors, and predictable validation can make complex forms easier for everyone.",
    content: [
      "Accessible forms connect labels, instructions, error messages, and required states in ways assistive technologies can announce.",
      "Inline validation should explain how to fix a problem instead of only saying that something went wrong.",
      "When forms are built with plain language and resilient markup, completion rates improve across devices and user needs.",
    ],
    createdAt: "2026-04-14T09:00:00.000Z",
    postCategories: [
      { id: "cat-inclusive-design", name: "Inclusive Design", slug: "inclusive-design" },
    ],
    tags: [{ id: "tag-forms", name: "Forms", slug: "forms" }],
    countries: [{ id: "global", name: "Global", slug: "global" }],
  },
  {
    _id: "guide-assistive-tech",
    slug: "what-teams-learn-from-testing-with-assistive-technology",
    title: "What teams learn from testing with assistive technology",
    category: "article",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Screen readers, magnifiers, switches, and voice control expose product assumptions that visual reviews miss.",
    content: [
      "Assistive technology testing helps teams understand whether semantic structure and interaction patterns are actually usable.",
      "The most valuable sessions include realistic tasks, patient observation, and time to discuss tradeoffs with participants.",
      "Findings should feed directly into component guidance so improvements scale beyond one page.",
    ],
    createdAt: "2026-04-10T09:00:00.000Z",
    postCategories: [
      { id: "cat-research", name: "User Research", slug: "user-research" },
    ],
    tags: [{ id: "tag-assistive-tech", name: "Assistive Tech", slug: "assistive-tech" }],
    countries: [{ id: "global", name: "Global", slug: "global" }],
  },
  {
    _id: "news-wcag-training",
    slug: "new-wcag-training-series-focuses-on-practical-team-workflows",
    title: "New WCAG training series focuses on practical team workflows",
    category: "news",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    summary:
      "The program translates guidelines into design, engineering, content, and QA habits teams can repeat.",
    content: [
      "A new training series is helping cross-functional teams turn accessibility requirements into everyday delivery practices.",
      "Sessions cover planning, acceptance criteria, code review, content checks, and release testing.",
      "Organizers say the goal is to make accessibility easier to share across product roles.",
    ],
    createdAt: "2026-05-02T09:00:00.000Z",
    postCategories: [{ id: "cat-training", name: "Training", slug: "training" }],
    tags: [{ id: "tag-wcag", name: "WCAG", slug: "wcag" }],
    countries: [{ id: "global", name: "Global", slug: "global" }],
  },
  {
    _id: "news-public-services",
    slug: "public-service-teams-expand-plain-language-accessibility-reviews",
    title: "Public service teams expand plain language accessibility reviews",
    category: "news",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Content teams are pairing readability checks with accessibility QA to improve essential services.",
    content: [
      "Public service teams are broadening accessibility reviews to include plain language, reading order, and task clarity.",
      "The work reflects a wider shift toward measuring whether residents can complete essential tasks without specialist knowledge.",
      "Teams are also publishing clearer guidance for forms, notices, and service updates.",
    ],
    createdAt: "2026-04-28T09:00:00.000Z",
    postCategories: [
      { id: "cat-policy", name: "Policy and Standards", slug: "policy-and-standards" },
    ],
    tags: [{ id: "tag-plain-language", name: "Plain Language", slug: "plain-language" }],
    countries: [{ id: "global", name: "Global", slug: "global" }],
  },
  {
    _id: "news-design-systems",
    slug: "design-system-teams-prioritize-accessible-component-documentation",
    title: "Design system teams prioritize accessible component documentation",
    category: "news",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    summary:
      "More teams are documenting keyboard behavior, ARIA usage, and content rules alongside component examples.",
    content: [
      "Design system maintainers are expanding documentation to explain how components should behave for keyboard and screen reader users.",
      "Guidance now often includes focus management, error states, accessible names, and testing notes.",
      "The shift helps product teams reuse patterns without rediscovering accessibility decisions on every feature.",
    ],
    createdAt: "2026-04-24T09:00:00.000Z",
    postCategories: [
      { id: "cat-design-systems", name: "Design Systems", slug: "design-systems" },
    ],
    tags: [{ id: "tag-components", name: "Components", slug: "components" }],
    countries: [{ id: "global", name: "Global", slug: "global" }],
  },
  {
    _id: "news-captions",
    slug: "caption-quality-becomes-a-core-measure-for-video-publishing",
    title: "Caption quality becomes a core measure for video publishing",
    category: "news",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Publishers are moving beyond auto-generated captions toward review workflows that improve accuracy and timing.",
    content: [
      "Video teams are treating caption accuracy, speaker identification, and timing as part of editorial quality.",
      "Better caption workflows support deaf and hard-of-hearing audiences while improving search, translation, and noisy-environment viewing.",
      "Accessibility specialists recommend reviewing captions before publication for any high-value or public-facing content.",
    ],
    createdAt: "2026-04-20T09:00:00.000Z",
    postCategories: [
      { id: "cat-content", name: "Accessible Content", slug: "accessible-content" },
    ],
    tags: [{ id: "tag-captions", name: "Captions", slug: "captions" }],
    countries: [{ id: "global", name: "Global", slug: "global" }],
  },
];

const buildTaxonomyFallback = (type: "category" | "country") => {
  const source =
    type === "category"
      ? accessibilityContent.flatMap((item) => item.postCategories ?? [])
      : accessibilityContent.flatMap((item) => item.countries ?? []);
  const counts = new Map<string, TaxonomySummary>();

  source.forEach((item) => {
    const existing = counts.get(item.slug);
    counts.set(item.slug, {
      id: item.id,
      name: item.name,
      slug: item.slug,
      count: (existing?.count ?? 0) + 1,
    });
  });

  return Array.from(counts.values());
};

const filterFallbackContent = ({
  category,
  postCategory,
  country,
  query,
}: {
  category?: "article" | "news";
  postCategory?: string;
  country?: string;
  query?: string;
}) => {
  const normalizedQuery = query?.trim().toLowerCase();

  return accessibilityContent.filter((item) => {
    if (category && item.category !== category) {
      return false;
    }

    if (
      postCategory &&
      !item.postCategories?.some((itemCategory) => itemCategory.slug === postCategory)
    ) {
      return false;
    }

    if (country && !item.countries?.some((itemCountry) => itemCountry.slug === country)) {
      return false;
    }

    if (normalizedQuery) {
      const searchable = `${item.title} ${item.summary} ${item.content.join(" ")}`.toLowerCase();
      return searchable.includes(normalizedQuery);
    }

    return true;
  });
};

const paginate = (items: Innov8iveItem[], page: number, limit: number) => {
  const totalPages = Math.max(1, Math.ceil(items.length / limit));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * limit;

  return {
    articles: items.slice(start, start + limit),
    pagination: {
      page: safePage,
      limit,
      total: items.length,
      totalPages,
    },
  };
};

const fetchFromApi = async <T>(path: string) => {
  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
};

export const getFeaturedArticles = async (country?: string) => {
  const params = new URLSearchParams({
    category: "article",
    limit: "9",
  });

  if (country) {
    params.set("country", country);
  }

  const data = await fetchFromApi<ArticleListResponse>(
    `/api/articles?${params.toString()}`,
  );

  return data?.articles?.length
    ? data.articles
    : filterFallbackContent({ category: "article", country }).slice(0, 9);
};

export const getLatestNews = async (country?: string) => {
  const params = new URLSearchParams({
    category: "news",
    limit: "9",
  });

  if (country) {
    params.set("country", country);
  }

  const data = await fetchFromApi<ArticleListResponse>(
    `/api/articles?${params.toString()}`,
  );

  return data?.articles?.length
    ? data.articles
    : filterFallbackContent({ category: "news", country }).slice(0, 9);
};

export const getPaginatedContent = async ({
  category,
  postCategory,
  country,
  query,
  page = 1,
  limit = 9,
}: {
  category?: "article" | "news";
  postCategory?: string;
  country?: string;
  query?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (category) {
    params.set("category", category);
  }

  if (postCategory) {
    params.set("postCategory", postCategory);
  }

  if (country) {
    params.set("country", country);
  }

  if (query) {
    params.set("q", query);
  }

  const data = await fetchFromApi<ArticleListResponse>(
    `/api/articles?${params.toString()}`,
  );

  if (data?.articles?.length || data?.pagination?.total) {
    return {
      articles: data.articles,
      pagination: data.pagination ?? {
        page,
        limit,
        total: data.articles.length,
        totalPages: Math.max(1, Math.ceil(data.articles.length / limit)),
      },
    };
  }

  return paginate(
    filterFallbackContent({ category, postCategory, country, query }),
    page,
    limit,
  );
};

export const getPublishedTaxonomy = async (type: "category" | "country") => {
  const params = new URLSearchParams({ type });
  const data = await fetchFromApi<TaxonomySummaryResponse>(
    `/api/articles/taxonomy?${params.toString()}`,
  );

  return data?.items?.length ? data.items : buildTaxonomyFallback(type);
};

export const getArticleBySlug = async (
  slug: string,
  category?: "article" | "news",
) => {
  const data = await fetchFromApi<ArticleDetailResponse>(`/api/articles/${slug}`);
  const article = data?.article;

  if (article && (!category || article.category === category)) {
    return article;
  }

  return accessibilityContent.find(
    (item) => item.slug === slug && (!category || item.category === category),
  );
};
