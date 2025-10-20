// src/components/cards/NihilistCard.tsx
"use client";
import React from "react";

type Props = {
  title?: string;
  content?: string;
  cta?: string;
  onSubmit?: (email: string) => void;
};

export default function NihilistCard({
  title = "Newsletter",
  content = "Get existential crisis delivered straight to your inbox every week.",
  cta = "Click me",
  onSubmit,
}: Props) {
  const [email, setEmail] = React.useState("");

  return (
    <div
      className="w-[300px] p-5 bg-white text-black border-[6px] border-black shadow-[12px_12px_0_#000] transition-transform duration-300 hover:-translate-x-[5px] hover:-translate-y-[5px] hover:shadow-[17px_17px_0_#000] dark:bg-neutral-100 dark:text-neutral-900"
      role="region"
      aria-label={title}
    >
      <span className="text-[32px] font-black uppercase mb-3 block relative overflow-hidden">
        {title}
        <span className="absolute bottom-0 left-0 w-[90%] h-[3px] bg-black -translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
      </span>

      <p className="text-[16px] leading-snug mb-5">{content}</p>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(email);
        }}
      >
        <input
          required
          type="email"
          placeholder="Your life"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 border-[3px] border-black text-[16px] bg-white focus:outline-none transition-transform duration-300 focus:scale-105 focus:bg-black focus:text-white"
        />

        <button
          className="relative overflow-hidden border-[3px] border-black bg-black text-white py-2 text-[18px] font-bold uppercase cursor-pointer w-1/2"
          type="submit"
        >
          {cta}
          <span className="absolute inset-0 translate-y-full bg-[#5ad641] text-black grid place-items-center transition-transform duration-300 hover:translate-y-0">
            Sure?
          </span>
        </button>
      </form>
    </div>
  );
}
