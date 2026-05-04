"use client";

import Select from "react-select";

type CountryOption = {
  value: string;
  label: string;
  code: string;
};

const africanCountries: CountryOption[] = [
  { code: "dz", value: "Algeria", label: "Algeria" },
  { code: "ao", value: "Angola", label: "Angola" },
  { code: "bj", value: "Benin", label: "Benin" },
  { code: "bw", value: "Botswana", label: "Botswana" },
  { code: "bf", value: "Burkina Faso", label: "Burkina Faso" },
  { code: "bi", value: "Burundi", label: "Burundi" },
  { code: "cm", value: "Cameroon", label: "Cameroon" },
  { code: "cv", value: "Cape Verde", label: "Cape Verde" },
  { code: "cf", value: "Central African Republic", label: "Central African Republic" },
  { code: "td", value: "Chad", label: "Chad" },
  { code: "km", value: "Comoros", label: "Comoros" },
  { code: "cd", value: "DR Congo", label: "DR Congo" },
  { code: "dj", value: "Djibouti", label: "Djibouti" },
  { code: "eg", value: "Egypt", label: "Egypt" },
  { code: "gq", value: "Equatorial Guinea", label: "Equatorial Guinea" },
  { code: "er", value: "Eritrea", label: "Eritrea" },
  { code: "et", value: "Ethiopia", label: "Ethiopia" },
  { code: "ga", value: "Gabon", label: "Gabon" },
  { code: "gm", value: "Gambia", label: "Gambia" },
  { code: "gh", value: "Ghana", label: "Ghana" },
  { code: "gn", value: "Guinea", label: "Guinea" },
  { code: "gw", value: "Guinea-Bissau", label: "Guinea-Bissau" },
  { code: "ci", value: "Ivory Coast", label: "Ivory Coast" },
  { code: "ke", value: "Kenya", label: "Kenya" },
  { code: "ls", value: "Lesotho", label: "Lesotho" },
  { code: "lr", value: "Liberia", label: "Liberia" },
  { code: "ly", value: "Libya", label: "Libya" },
  { code: "mg", value: "Madagascar", label: "Madagascar" },
  { code: "mw", value: "Malawi", label: "Malawi" },
  { code: "ml", value: "Mali", label: "Mali" },
  { code: "mr", value: "Mauritania", label: "Mauritania" },
  { code: "mu", value: "Mauritius", label: "Mauritius" },
  { code: "ma", value: "Morocco", label: "Morocco" },
  { code: "mz", value: "Mozambique", label: "Mozambique" },
  { code: "na", value: "Namibia", label: "Namibia" },
  { code: "ne", value: "Niger", label: "Niger" },
  { code: "ng", value: "Nigeria", label: "Nigeria" },
  { code: "cg", value: "Republic of the Congo", label: "Republic of the Congo" },
  { code: "rw", value: "Rwanda", label: "Rwanda" },
  { code: "st", value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
  { code: "sn", value: "Senegal", label: "Senegal" },
  { code: "sc", value: "Seychelles", label: "Seychelles" },
  { code: "sl", value: "Sierra Leone", label: "Sierra Leone" },
  { code: "so", value: "Somalia", label: "Somalia" },
  { code: "za", value: "South Africa", label: "South Africa" },
  { code: "ss", value: "South Sudan", label: "South Sudan" },
  { code: "sd", value: "Sudan", label: "Sudan" },
  { code: "sz", value: "Eswatini", label: "Eswatini" },
  { code: "tz", value: "Tanzania", label: "Tanzania" },
  { code: "tg", value: "Togo", label: "Togo" },
  { code: "tn", value: "Tunisia", label: "Tunisia" },
  { code: "ug", value: "Uganda", label: "Uganda" },
  { code: "zm", value: "Zambia", label: "Zambia" },
  { code: "zw", value: "Zimbabwe", label: "Zimbabwe" },
];

export default function CountrySelect() {
  return (
    <Select
      className="country-select-wrapper"
      classNamePrefix="country-select"
      options={africanCountries}
      placeholder="Select Region"
      isSearchable
      maxMenuHeight={280}
      formatOptionLabel={(option) => (
        <div className="country-option-row">
          <span
            className="country-flag"
            style={{
              backgroundImage: `url(https://flagcdn.com/w40/${option.code}.png)`,
            }}
            aria-hidden="true"
          />
          <span>{option.label}</span>
        </div>
      )}
    />
  );
}
