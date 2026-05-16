"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-black">
          Name
          <input
            required
            type="text"
            placeholder="Name"
            className="h-12 rounded-xl bg-[#ececec] px-4 text-sm font-normal text-black outline-none ring-0 placeholder:text-neutral-500"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-black">
          Email
          <input
            required
            type="email"
            placeholder="Email"
            className="h-12 rounded-xl bg-[#ececec] px-4 text-sm font-normal text-black outline-none placeholder:text-neutral-500"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-black">
          Phone
          <input
            type="tel"
            placeholder="Phone"
            className="h-12 rounded-xl bg-[#ececec] px-4 text-sm font-normal text-black outline-none placeholder:text-neutral-500"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-black">
          Country
          <select
            className="h-12 rounded-xl bg-[#ececec] px-4 text-sm font-normal text-black outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Country
            </option>
            <option value="global">Global</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="gh">Ghana</option>
          </select>
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-semibold text-black">
        Message
        <textarea
          required
          rows={5}
          placeholder="Message"
          className="resize-none rounded-xl bg-[#ececec] px-4 py-3 text-sm font-normal text-black outline-none placeholder:text-neutral-500"
        />
      </label>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-black py-3.5 text-sm font-bold text-white transition hover:bg-neutral-800 sm:w-auto sm:px-8"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black">
          →
        </span>
        Get Support
      </button>

      {submitted ? (
        <p className="mt-4 text-sm font-medium text-[#c69762]" role="status">
          Thank you. We will respond within 24 hours.
        </p>
      ) : null}
    </form>
  );
}
