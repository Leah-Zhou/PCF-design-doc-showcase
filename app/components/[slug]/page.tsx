import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderDoc } from "@/components/docs/PlaceholderDoc";
import { findNavItem } from "@/lib/navigation";

const slugs = ["input", "toast"] as const;

type ComponentSlug = (typeof slugs)[number];

type ComponentPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ComponentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = findNavItem(`/components/${slug}`);
  return { title: item?.title ?? "Components" };
}

export default async function ComponentPlaceholderPage({
  params,
}: ComponentPageProps) {
  const { slug } = await params;

  if (!slugs.includes(slug as ComponentSlug)) {
    notFound();
  }

  const item = findNavItem(`/components/${slug}`);

  if (!item) {
    notFound();
  }

  return <PlaceholderDoc title={item.title} />;
}
