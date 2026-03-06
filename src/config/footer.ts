export type FooterNavLink = {
  label: string;
  href: string;
};

export type FooterNavGroup = {
  title: string;
  links: FooterNavLink[];
};

export const FOOTER_CONTENT = {
  headingLine1: "That's all folks.",
  headingLine2: "Here are a few quick links to navigate through.",
  ownerName: "Meghraj Jare",
  navGroups: [
    {
      title: "Sitemap",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Documentation", href: "/docs" },
      ],
    },
  ] satisfies FooterNavGroup[],
  legalLinks: [
    { label: "Ecosystem Disclaimer", href: "/disclaimer" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;
