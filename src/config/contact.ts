export type ContactIconKey = "github" | "linkedin" | "mail" | "instagram";

export type ContactLink = {
  label: string;
  href: string;
  icon: ContactIconKey;
  target?: "_blank";
  rel?: string;
};

export const CONTACT_CONTENT = {
  heading: "Let's Talk",
  subheadingLine1: "Have a project in mind?",
  subheadingLine2: "Let's build something great.",
  description:
    "I'm available for freelance projects and full-time opportunities. If you like what you see here—drop me a message.",
  primaryContactLabel: "Primary Contact",
  primaryEmail: "meghrajjare77@gmail.com",
  decorativeText: "Connect",
  links: [
    {
      label: "GitHub",
      href: "https://github.com/meghrajjare5273",
      icon: "github",
      target: "_blank" as const,
      rel: "noreferrer",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/meghrajjare5273",
      icon: "linkedin",
      target: "_blank" as const,
      rel: "noreferrer",
    },
    {
      label: "Email",
      href: "mailto:meghrajjare77@gmail.com",
      icon: "mail",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/meghrajjare",
      icon: "instagram",
    },
  ] satisfies ContactLink[],
} as const;
