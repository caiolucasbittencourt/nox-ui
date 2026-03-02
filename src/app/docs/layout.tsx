import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AutoTableOfContents from "@/components/AutoTableOfContents";
import { componentMap, sidebarCategories, guideEntries } from "@/registry";

/* Sidebar guide links derived from guideEntries */
const guideLinks = guideEntries.map((g) => ({ name: g.title, slug: g.slug }));

/* Build flat search items from guides + components */
const searchItems = [
  ...guideEntries.map((g) => ({ label: g.title, slug: g.slug })),
  ...Object.values(componentMap).map((c) => ({ label: c.title, slug: c.slug })),
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black text-white">
      <Navbar searchItems={searchItems} />

      <div className="flex min-h-0 flex-1">
        <Sidebar guideLinks={guideLinks} categories={sidebarCategories} />

        <main className="flex-1 overflow-y-auto">
          <div className="px-16">
            <div className="min-w-0 flex-1 pb-[72px] pt-9">{children}</div>
          </div>
        </main>

        <div className="hidden w-[260px] shrink-0 border-l border-neutral-700/50 xl:block">
          <AutoTableOfContents />
        </div>
      </div>
    </div>
  );
}
