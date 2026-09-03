type BrandIconProps = {
  brand: string;
};

export function BrandIcon({ brand }: BrandIconProps) {
  const common = {
    viewBox: "0 0 24 24",
    role: "img",
    "aria-hidden": true,
    focusable: false,
    className: `brand-icon brand-icon-${brand}`,
  } as const;

  if (brand === "github") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M12 .3A12 12 0 0 0 8.2 23.7c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
      </svg>
    );
  }

  if (brand === "linkedin") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M20.4 20.5h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.2 2.4 4.2 5.5v6.3ZM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1Zm1.3 13.1H4V9h2.6v11.5Z" />
      </svg>
    );
  }

  if (brand === "youtube") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.5 15.8V8.2L15.8 12l-6.3 3.8Z" />
      </svg>
    );
  }

  if (brand === "scholar") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M5.2 13.8 0 9.5 12 0l12 9.5-5.2 4.3A7.5 7.5 0 0 0 12 9.5a7.5 7.5 0 0 0-6.8 4.3ZM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z" />
      </svg>
    );
  }

  if (brand === "orcid") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="8" cy="8" r="1.2" fill="currentColor" />
        <path fill="currentColor" d="M6.9 10.5h2.2v7H6.9v-7Zm4 0h3.2c2.3 0 3.9 1.4 3.9 3.5s-1.6 3.5-3.9 3.5h-3.2v-7Zm2.1 1.8v3.4h1c1.1 0 1.8-.6 1.8-1.7s-.7-1.7-1.8-1.7h-1Z" />
      </svg>
    );
  }

  if (brand === "researchgate") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path fill="currentColor" d="M5.7 7.1h4c2 0 3.3 1.1 3.3 3 0 1.2-.6 2.1-1.6 2.6l2 4.2h-2.3l-1.7-3.7H7.8v3.7H5.7V7.1Zm2.1 1.8v2.5h1.7c.9 0 1.4-.4 1.4-1.3 0-.8-.5-1.2-1.4-1.2H7.8Zm9.5 2.3c1.3 0 2.2.5 2.8 1.2l-1.3 1.2a1.8 1.8 0 0 0-1.4-.6c-1.2 0-2 .8-2 2s.8 2.1 2 2.1c.5 0 .9-.1 1.2-.4v-.9h-1.5v-1.5h3.4v3.2a4.4 4.4 0 0 1-3.2 1.4c-2.4 0-4.1-1.6-4.1-3.9 0-2.2 1.7-3.8 4.1-3.8Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m9.5 14.5 5-5M10 9.5h4.5V14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
