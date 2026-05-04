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
};

type HomeSearchFormProps = {
  countries: TaxonomySummary[];
  selectedCountry?: string;
};

export default function HomeSearchForm({
  countries,
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
  const [query, setQuery] = useState("");

  const handleCountryChange = (option: CountryOption | null) => {
    setCountry(option);
    router.push(option ? `/?country=${encodeURIComponent(option.value)}` : "/");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      className="relative z-10 mt-10 flex flex-col gap-3 rounded-2xl bg-white/95 p-3 shadow-lg ring-1 ring-black/5 md:absolute md:bottom-5 md:left-8 md:right-8 md:mt-0 md:flex-row md:items-center md:gap-4"
      onSubmit={handleSubmit}
    >
      <div className="w-full md:w-56">
        <Select<CountryOption, false>
          className="country-select-wrapper"
          classNamePrefix="country-select"
          options={options}
          value={country}
          placeholder="Select Region"
          isClearable
          isSearchable
          maxMenuHeight={280}
          onChange={handleCountryChange}
          noOptionsMessage={() => "No regions with published accessibility posts"}
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
      <input
        className="h-[52px] min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/25"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search accessibility guides, updates, or topics"
      />
      <button
        className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#5eead4] px-6 font-semibold text-[#10243f] transition hover:bg-[#2dd4bf] md:w-[170px]"
        type="submit"
      >
        Search <span aria-hidden="true">➜</span>
      </button>
    </form>
  );
}
