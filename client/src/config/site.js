// Central site configuration: contact + social links used across the app.
export const EMAIL = "mikeg.o.a.t.1@gmail.com";
export const EMAIL_HREF = `mailto:${EMAIL}`;

export const LINKEDIN_URL =
  "https://www.linkedin.com/in/michael-johnson-8b752790/";
export const LINKEDIN_HANDLE = "/in/michael-johnson-8b752790";
export const GITHUB_URL = "https://github.com/mikegoat1?tab=repositories";
export const GITHUB_USERNAME = "mikegoat1";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

// Resume asset filename (lives in src/assets/).
export const RESUME_FILENAME = "10-31-24 Resume Coding .pdf";

// === Contact form (Formspree) ===
export const FORMSPREE_ID = "mojzqaoz";
export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

// === SEO / Open Graph ===
// Site is deployed under the GitHub Pages project path.
export const SITE_URL = "https://mikegoat1.github.io/Portfolio3.0";
export const SITE_NAME = "Michael Johnson — Full Stack Developer";
export const OG_IMAGE = `${SITE_URL}/og-image.png`; // TODO: produce og-image.png in client/public/
export const TWITTER_HANDLE = "@mikegoat1";

// === Navigation links (single source for Navbar) ===
// `index` maps to the MUI Tabs selected value on each route.
export const NAV_LINKS = [
  { label: "About", to: "/about" },
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
  { label: "Resume", to: "/resume" },
];
