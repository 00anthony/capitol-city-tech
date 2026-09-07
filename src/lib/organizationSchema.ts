/**
 * Organization structured data (schema.org/ProfessionalService) — helps
 * search engines and AI crawlers understand what the business is, where it
 * operates, and which social profiles are actually its own. Kept strictly
 * to facts already stated elsewhere on the site (description, service area,
 * social links) rather than anything new.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Capitol City Tech",
  url: "https://capitolcity.tech",
  logo: "https://capitolcity.tech/logo-white.png",
  image: "https://capitolcity.tech/og-image.png",
  description:
    "Capitol City Tech builds modern websites for businesses in Austin and across Texas. Custom web design, development, SEO, and performance-focused solutions that help companies stand out online.",
  areaServed: ["Austin, TX", "Texas"],
  sameAs: [
    "https://www.instagram.com/capitolcitytech/",
    "https://www.facebook.com/p/Capitol-City-Tech-61553727423033/",
  ],
};
