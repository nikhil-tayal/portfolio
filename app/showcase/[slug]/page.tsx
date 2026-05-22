import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllShowcases,
  getShowcaseBySlug,
} from "@/lib/data";
import { ShowcaseDetail } from "@/components/ShowcaseDetail";
import { SITE_URL } from "@/app/layout";

export function generateStaticParams() {
  return getAllShowcases().map(({ item }) => ({ slug: item.slug }));
}

export async function generateMetadata(
  props: PageProps<"/showcase/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const found = getShowcaseBySlug(slug);
  if (!found) return { title: "Showcase not found" };
  const { item, company } = found;
  const title = `${item.name} — ${company} · Nikhil Tayal`;
  const description = `${item.brief} Built by Nikhil Tayal at ${company}.`;
  const url = `${SITE_URL}/showcase/${slug}`;
  const ogImage = item.screenshot
    ? { url: item.screenshot, width: 1200, height: 630, alt: `${item.name} by Nikhil Tayal` }
    : { url: "/opengraph-image", width: 1200, height: 630, alt: `${item.name} by Nikhil Tayal` };
  return {
    title,
    description,
    authors: [{ name: "Nikhil Tayal", url: SITE_URL }],
    creator: "Nikhil Tayal",
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "Nikhil Tayal",
      images: [ogImage],
      authors: ["Nikhil Tayal"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
      creator: "@nikhiltayal",
    },
  };
}

export default async function ShowcaseDetailPage(
  props: PageProps<"/showcase/[slug]">
) {
  const { slug } = await props.params;
  const found = getShowcaseBySlug(slug);
  if (!found) notFound();

  const all = getAllShowcases();
  const idx = all.findIndex((s) => s.item.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  const { item, company, role } = found;
  const url = `${SITE_URL}/showcase/${slug}`;
  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.name,
    headline: `${item.name} — ${company}`,
    description: item.brief,
    url,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Nikhil Tayal",
      url: SITE_URL,
      jobTitle: role,
    },
    creator: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    ...(item.screenshot ? { image: `${SITE_URL}${item.screenshot}` } : {}),
    ...(item.liveUrl ? { sameAs: item.liveUrl } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <ShowcaseDetail showcase={found} prev={prev} next={next} />
    </>
  );
}
