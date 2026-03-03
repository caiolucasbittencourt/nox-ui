import Sidebar from "@/components/Sidebar";
import ConditionalTableOfContents from "@/components/ConditionalTableOfContents";
import Breadcrumb from "@/components/Breadcrumb";
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
    <div className="flex h-screen overflow-hidden bg-black text-white">
      <Sidebar
        guideLinks={guideLinks}
        categories={sidebarCategories}
        searchItems={searchItems}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="px-12 lg:px-16">
          <div className="min-w-0 flex-1 pb-[72px] pt-8">
            <Breadcrumb />
            {children}
          </div>
        </div>
      </main>

      <div className="hidden w-[220px] shrink-0 border-l border-neutral-800/60 xl:block">
        <ConditionalTableOfContents />
      </div>
    </div>
  );
}
