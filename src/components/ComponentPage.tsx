"use client";

import { componentMap } from "@/registry";
import CodeBlock from "@/components/CodeBlock";
import ComponentViewer from "@/components/ComponentViewer";
import PropsTable from "@/components/PropsTable";

interface ComponentPageProps {
  slug: string;
}

export default function ComponentPage({ slug }: ComponentPageProps) {
  const comp = componentMap[slug];

  if (!comp) {
    return (
      <div className="text-center text-neutral-400">
        Component not found: {slug}
      </div>
    );
  }

  return (
    <>
      <div className="mb-[60px]">
        <h1 className="text-3xl font-bold tracking-tight">{comp.title}</h1>
        <p className="mt-3 text-[17px] leading-[1.75] text-neutral-400">
          {comp.description}
        </p>
      </div>

      <section id="preview" className="mb-[60px] scroll-mt-20">
        <h2 className="mb-6 text-lg font-semibold">Preview</h2>
        <ComponentViewer code={comp.code}>{comp.demo}</ComponentViewer>
      </section>

      <section id="installation" className="mb-[60px] scroll-mt-20">
        <h2 className="mb-6 text-lg font-semibold">Installation</h2>
        <p className="mb-6 text-[17px] text-neutral-500">
          Make sure you have the required dependencies installed.
        </p>
        <CodeBlock
          code={`npm install ${(comp.dependencies ?? []).join(" ")}`.trim()}
          language="bash"
          showLineNumbers={false}
        />
      </section>

      <section id="usage" className="mb-[60px] scroll-mt-20">
        <h2 className="mb-6 text-lg font-semibold">Usage</h2>
        <p className="mb-6 text-[17px] text-neutral-500">
          Copy the component into your project and import it.
        </p>
        <CodeBlock
          code={
            comp.usage ??
            `import { ${comp.title.replace(/\s+/g, "")} } from "@/components/ui/${comp.slug}";\n\nexport default function Page() {\n  return <${comp.title.replace(/\s+/g, "")} />;\n}`
          }
          language="tsx"
          showLineNumbers={true}
        />
      </section>

      {comp.props.length > 0 && (
        <section id="props" className="mb-24 scroll-mt-20">
          <h2 className="mb-6 text-lg font-semibold">Props</h2>
          <PropsTable props={comp.props} />
        </section>
      )}
    </>
  );
}
