/**
 * All config-based metadata is located here.
 * This includes:
 * @baseMetadata shared metadata for all pages
 * @staticMetadata metadata for specific static pages
 * @baseViewport viewport options for all pages
 * @sitemap the generated sitemap for static and dynamic pages.
 * @robots the generated robots.txt file
 * @manifest the generated manifest file
 *
 * For dynamic metadata, we recommend using the generateMetadata function from Next.js inside
 * Individual pages:
 *
 * And as for structured data (JSON-LD) we installed `next-seo` and we recommend using it
 * on individual page/layout files.
 *
 * Here are the docs: https://www.npmjs.com/package/next-seo#json-ld
 */

import type { Metadata, MetadataRoute, Viewport } from "next";

import { projectName, siteConfig } from "./next-inject";

// ! Here you define metadata that should be available on all your pages.

const description = `Find the perfect partner for your startup in 2 weeks. Find a partner with complementary skills, shared vision, and dedication to create and scale your startup.`;
export const baseMetadata: Metadata = {
  title: {
    default: projectName,
    template: `%s | ${projectName}`,
  },
  description,
  keywords: [
    projectName,
    "SaaS cofounder matching",
    "find marketing cofounder",
    "find developer cofounder",
    "find cofounder",
    "find partner for SaaS",
    "SaaS partner",
    "indie makers",
    "SaaS builders",
    "startup partners",
    "SaaS growth",
    "indie entrepreneurship",
    "solopreneur success",
    "cofounder matching",
    "find a cofounder",
    "cofounder directory",
    "launch SaaS faster",
    "startup collaboration",
    "SaaS directory",
    "find cofounder",
    "product development",
    "trustworthy partnerships",
    "SaaS marketing solutions",
    "cofounder refund guarantee",
    "build and grow SaaS",
    "indie startup community",
    "business partner",
    "find partner for business",
    "startup partner",
    "find partner for startup",
    "startup cofounder",
    "find startup cofounder",
    "startup cofounder matching",
    "find startup cofounder matching",
    "startup partner matching",
  ],
  applicationName: projectName,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "./",
  },
  // ! Make sure to change the base opengraph and manifest images, located in public/images.
  openGraph: {
    title: {
      default: projectName,
      template: `%s | ${projectName}`,
    },
    description,
    url: "/",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/devmarket.png`,
        type: "image/webp",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: projectName,
      template: `%s | ${projectName}`,
    },
    description,
    images: [
      {
        url: `${siteConfig.url}/images/devmarket.png`,
        type: "image/webp",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
};

export const baseViewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "white",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "black",
    },
  ],
  colorScheme: "dark light",
};

// ! Here is where you extend the `baseMetadata` object defined above, and make it specific for any pages you add.
// ! Make sure to export the metadata object in your page.tsx files as follows:

/**
  export const metadata: Metadata = {
  ...staticMetadata.mainPage,
  }
*/
export const staticMetadata = {
  ...baseMetadata,
  blog: {
    title: "Blog",
    description: "The Official DevMarket Blog",
    keywords: [...new Set([...baseMetadata.keywords!])],
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Blog",
      description: "The Official DevMarket Blog",
      images: [
        {
          url: `images/devmarket.png`,
          type: "image/png",
          width: 1200,
          height: 630,
          alt: "Blog",
        },
      ],
      url: "/blog",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Blog",
      description: "The Official DevMarket Blog",
      images: [
        {
          url: `images/devmarket.png`,
          type: "image/png",
          width: 1200,
          height: 630,
          alt: "Blog",
        },
      ],
    },
  } satisfies Metadata,
  mainPage: {
    title: { absolute: projectName },
    openGraph: {
      ...baseMetadata.openGraph,
      title: { absolute: projectName },
    },
    twitter: {
      ...baseMetadata.twitter,
      title: { absolute: projectName },
    },
  } satisfies Metadata,
  login: {
    title: "Login",
    description:
      "Sign in to your DevMarket account to find your ideal startup partner",
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Login",
      description:
        "Sign in to your DevMarket account to find your ideal startup partner",
      url: "/login",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Login",
      description:
        "Sign in to your DevMarket account to find your ideal startup partner",
    },
  } satisfies Metadata,

  privacy: {
    title: "Privacy Policy",
    description: "Learn how DevMarket protects and handles your data",
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Privacy Policy",
      description: "Learn how DevMarket protects and handles your data",
      url: "/privacy",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Privacy Policy",
      description: "Learn how DevMarket protects and handles your data",
    },
  } satisfies Metadata,

  tos: {
    title: "Terms of Service",
    description: "DevMarket's terms of service and user agreement",
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Terms of Service",
      description: "DevMarket's terms of service and user agreement",
      url: "/tos",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Terms of Service",
      description: "DevMarket's terms of service and user agreement",
    },
  } satisfies Metadata,

  match: {
    title: "Find Your Match",
    description:
      "Get matched with the perfect startup partner based on your skills and preferences",
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Find Your Match",
      description:
        "Get matched with the perfect startup partner based on your skills and preferences",
      url: "/match",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Find Your Match",
      description:
        "Get matched with the perfect startup partner based on your skills and preferences",
    },
  } satisfies Metadata,

  matches: {
    title: "Your Matches",
    description: "View and connect with your potential startup partners",
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Your Matches",
      description: "View and connect with your potential startup partners",
      url: "/matches",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Your Matches",
      description: "View and connect with your potential startup partners",
    },
  } satisfies Metadata,

  profile: {
    title: "Your Profile",
    description: "Manage your DevMarket profile and preferences",
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Your Profile",
      description: "Manage your DevMarket profile and preferences",
      url: "/profile",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Your Profile",
      description: "Manage your DevMarket profile and preferences",
    },
  } satisfies Metadata,
  matchesProfile: {
    title: "Matched Profile",
    description: "View and connect with your matched startup partner",
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Matched Profile",
      description: "View and connect with your matched startup partner",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Matched Profile",
      description: "View and connect with your matched startup partner",
    },
  } satisfies Metadata,

  new: {
    title: "Onboarding",
    description: "Onboard to start finding your ideal startup partner",
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Onboarding",
      description: "Onboard to start finding your ideal startup partner",
      url: "/new",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Onboarding",
      description: "Onboard to start finding your ideal startup partner",
    },
  } satisfies Metadata,
};

// ! Here is the sitemap, make sure to add any sitemap links into this array.
export async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries = [
    // ! See more about `siteConfig` in config/next-inject.tsx
    // ! Render dynamic sitemap entries here...
  ] as MetadataRoute.Sitemap;

  return sitemapEntries;
}
// ! These are the base robots.txt properties, make sure to change/add additional properties as you see fit.
export function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

// ! These are the most important manifest properties, make sure to add additional properties as you see fit.
export function manifest(): MetadataRoute.Manifest {
  return {
    name: projectName,
    short_name: projectName,
    description,
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    display: "standalone",
    start_url: "/",
    orientation: "portrait-primary",
    lang: "en-US",
    scope: "/",

    // ! Feel free to add/remove the icon sizes here.
    icons: [
      {
        src: "/images/icon-96x96.webp",
        sizes: "96x96",
        type: "image/webp",
      },
    ],
  };
}
