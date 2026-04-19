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
  const url = `${SITE_URL}/showcase/${slug}`;
  const ogImage = item.screenshot
    ? { url: item.screenshot, width: 1200, height: 630, alt: item.name }
    : { url: "/og-image.png", width: 1200, height: 630, alt: item.name };
  return {
    title,
    description: item.brief,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description: item.brief,
      siteName: "Nikhil Tayal",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: item.brief,
      images: [ogImage.url],
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

  return (
    <ShowcaseDetail
      showcase={found}
      prev={prev}
      next={next}
    />
  );
}
