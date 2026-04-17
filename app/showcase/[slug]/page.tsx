import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllShowcases,
  getShowcaseBySlug,
} from "@/lib/data";
import { ShowcaseDetail } from "@/components/ShowcaseDetail";

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
  return {
    title: `${item.name} — ${company} · Nikhil Tayal`,
    description: item.brief,
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
