"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import type { TaxonomySummary } from "../content";

type CountryOption = {
  value: string;
  label: string;
  code?: string;
};

const countryCodeBySlug: Record<string, string> = {
  algeria: "dz",
  angola: "ao",
  benin: "bj",
  botswana: "bw",
  "burkina-faso": "bf",
  burundi: "bi",
  cameroon: "cm",
  "cape-verde": "cv",
  "central-african-republic": "cf",
  chad: "td",
  comoros: "km",
  "dr-congo": "cd",
  djibouti: "dj",
  egypt: "eg",
  "equatorial-guinea": "gq",
  eritrea: "er",
  ethiopia: "et",
  gabon: "ga",
  gambia: "gm",
  ghana: "gh",
  guinea: "gn",
  "guinea-bissau": "gw",
  "ivory-coast": "ci",
  kenya: "ke",
  lesotho: "ls",
  liberia: "lr",
  libya: "ly",
  madagascar: "mg",
  malawi: "mw",
  mali: "ml",
  mauritania: "mr",
  mauritius: "mu",
  morocco: "ma",
  mozambique: "mz",
  namibia: "na",
  niger: "ne",
  nigeria: "ng",
  "republic-of-the-congo": "cg",
  rwanda: "rw",
  "sao-tome-and-principe": "st",
  senegal: "sn",
  seychelles: "sc",
  "sierra-leone": "sl",
  somalia: "so",
  "south-africa": "za",
  "south-sudan": "ss",
  sudan: "sd",
  eswatini: "sz",
  tanzania: "tz",
  togo: "tg",
  tunisia: "tn",
  uganda: "ug",
  zambia: "zm",
  zimbabwe: "zw",
  global: "un",
};

type HomeSearchFormProps = {
  countries: TaxonomySummary[];
  categories: TaxonomySummary[];
  selectedCountry?: string;
};

export default function HomeSearchForm({
  countries,
  categories,
  selectedCountry,
}: HomeSearchFormProps) {
  const router = useRouter();
  const options = useMemo(
    () =>
      countries.map((country) => ({
        value: country.slug,
        label: country.name,
        code: countryCodeBySlug[country.slug],
      })),
    [countries],
  );
  const [country, setCountry] = useState<CountryOption | null>(
    options.find((option) => option.value === selectedCountry) ?? null,
  );
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");

  const handleCountryChange = (option: CountryOption | null) => {
    setCountry(option);
    router.push(option ? `/?country=${encodeURIComponent(option.value)}` : "/");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (category && !query.trim() && !country) {
      router.push(`/categories/${category}`);
      return;
    }

    const params = new URLSearchParams();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      params.set("q", trimmedQuery);
    }

    if (country) {
      params.set("country", country.value);
    }

    router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <form
      className="relative z-10 -mt-6 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-lg ring-1 ring-black/5 sm:-mt-8 sm:flex-row sm:items-center sm:gap-3"
      onSubmit={handleSubmit}
    >
      <div className="w-full sm:w-52">
        <Select<CountryOption, false>
          className="country-select-wrapper"
          classNamePrefix="country-select"
          options={options}
          value={country}
          placeholder="Select Country"
          isClearable
          isSearchable
          maxMenuHeight={280}
          onChange={handleCountryChange}
          noOptionsMessage={() => "No countries with published posts"}
          formatOptionLabel={(option) => (
            <div className="country-option-row">
              {option.code ? (
                <span
                  className="country-flag"
                  style={{
                    backgroundImage: `url(https://flagcdn.com/w40/${option.code}.png)`,
                  }}
                  aria-hidden="true"
                />
              ) : null}
              <span>{option.label}</span>
            </div>
          )}
        />
      </div>

      <select
        className="h-[52px] w-full rounded-xl border border-neutral-200 bg-[#ececec] px-4 text-sm text-neutral-700 outline-none sm:w-44"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="">Category</option>
        {categories.map((item) => (
          <option key={item.id} value={item.slug}>
            {item.name}
          </option>
        ))}
      </select>

      <input
        className="h-[52px] min-w-0 flex-1 rounded-xl border border-neutral-200 bg-[#ececec] px-4 text-sm text-black outline-none placeholder:text-neutral-500"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Type news article here"
      />

      <button
        className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-bold text-white transition hover:bg-neutral-800 sm:w-auto sm:min-w-[140px]"
        type="submit"
      >
        Search
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#c69762] text-xs text-black">
          →
        </span>
      </button>
    </form>
  );
}
