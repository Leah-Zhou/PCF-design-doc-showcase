import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderDoc } from "@/components/docs/PlaceholderDoc";
import { findNavItem } from "@/lib/navigation";

const slugs = ["architecture", "accessibility", "governance"] as const;

type AboutSlug = (typeof slugs)[number];

type AboutPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = findNavItem(`/about/${slug}`);
  return { title: item?.title ?? "About the system" };
}

export default async function AboutPlaceholderPage({
  params,
}: AboutPageProps) {
  const { slug } = await params;

  if (!slugs.includes(slug as AboutSlug)) {
    notFound();
  }

  const item = findNavItem(`/about/${slug}`);

  if (!item) {
    notFound();
  }

  return <PlaceholderDoc title={item.title} />;
}
