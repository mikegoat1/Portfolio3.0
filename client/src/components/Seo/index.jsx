import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE_URL, SITE_NAME, OG_IMAGE, TWITTER_HANDLE } from "../../config/site";

/**
 * Per-page SEO + Open Graph + Twitter card meta.
 * Wraps react-helmet-async so each page passes only what differs.
 *
 * @param {string} title       - page <title> (also og:title / twitter:title)
 * @param {string} description - meta description (also og/twitter description)
 * @param {string} [path]      - route path for canonical/og:url (e.g. "/work")
 * @param {string} [image]     - absolute OG image URL (defaults to site OG_IMAGE)
 */
const Seo = ({ title, description, path = "/", image = OG_IMAGE }) => {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
    </Helmet>
  );
};

export default Seo;
