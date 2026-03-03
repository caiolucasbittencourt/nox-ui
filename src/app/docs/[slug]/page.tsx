import { notFound } from "next/navigation";
import { componentSlugs, guideMap, guideSlugs } from "@/registry";
import ComponentPage from "@/components/ComponentPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guideSlugsArray = Array.from(guideSlugs);

  const allSlugs = [...guideSlugsArray, ...componentSlugs].filter(
    (slug): slug is string => typeof slug === "string" && slug.length > 0
  );

  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    return { title: "Not Found | Nox UI" };
  }

  const isGuide = guideSlugs.has(slug);
  const isComponent = componentSlugs.includes(slug);

  if (!isGuide && !isComponent) {
    return { title: "Not Found | Nox UI" };
  }

  const guide = isGuide ? guideMap[slug] : null;
  const title =
    guide?.title ??
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${title} | Nox UI`,
    description: "Nox UI - Copy, Paste & Ship Fast",
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const isGuide = guideSlugs.has(slug);
  const isComponent = componentSlugs.includes(slug);

  if (!isGuide && !isComponent) {
    notFound();
  }

  // Guide page (server-rendered)
  if (isGuide) {
    const guide = guideMap[slug];
    return guide?.content ?? null;
  }

  // Component page (client-rendered)
  return <ComponentPage slug={slug} />;
}
