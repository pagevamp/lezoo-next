import { colorSwatches } from "./color";

const guideNavigation = [
  {
    id: "typography",
    label: "Typography",
    children: [
      { id: "typography-headings", label: "Headings" },
      { id: "typography-text", label: "Body Text" },
      { id: "typography-effects", label: "Text Shadow" },
    ],
  },
  { id: "color-system", label: "Color" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-off-white px-4 py-10 sm:px-6 lg:px-12">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row">
        <aside className="lg:w-64">
          <div className="sticky top-10 rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.5em] text-zinc-500">
              Style guide
            </p>
            <nav className="mt-6 space-y-4">
              {guideNavigation.map((section) => (
                <div key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm font-semibold text-zinc-800 transition hover:text-black"
                  >
                    {section.label}
                  </a>
                  {section.children && (
                    <ul className="mt-2 space-y-2 border-l border-zinc-200 pl-4 text-sm text-zinc-500">
                      {section.children.map((child) => (
                        <li key={child.id}>
                          <a
                            href={`#${child.id}`}
                            className="transition hover:text-black"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex-1 space-y-16">
          <section id="typography">
            <header className="space-y-2">
              <p className="text-xs uppercase tracking-[0.5em] text-zinc-500">
                Typography
              </p>
              <h1 className="h1">Typography System</h1>
              <p className="text-medium text-zinc-500">
                Consistent type utilities for headings, body copy, and accent
                styles across the product.
              </p>
            </header>

            <div id="typography-headings" className="mt-8 space-y-6 rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                    Headings
                  </p>
                  <p className="text-medium text-zinc-900">
                    Display & section titles
                  </p>
                </div>
                <code className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-white">
                  font: Casa Grande
                </code>
              </div>
              <div className="space-y-4">
                <h2 className="h2">Heading H2 Utility</h2>
                <h3 className="h3">Heading H3 Utility</h3>
                <h4 className="h4">Heading H4 Utility</h4>
              </div>
            </div>

            <div id="typography-text" className="mt-8 grid gap-6 rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
                  Body Large
                </p>
                <p className="text-large">Text Large Utility</p>
                <p className="text-sm text-zinc-500">
                  24px / Strawford / Bold / 129%
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
                  Body Medium
                </p>
                <p className="text-medium">Text Medium Utility</p>
                <p className="text-sm text-zinc-500">
                  18px / Strawford / Bold / 140%
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
                  Body Small
                </p>
                <p className="text-small">Text Small Utility</p>
                <p className="text-sm text-zinc-500">
                  18px / Strawford / Bold / 140%
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
                  Body Extra Small
                </p>
                <p className="text-extra-small">Text Extra Small Utility</p>
                <p className="text-sm text-zinc-500">
                  16px / Strawford / Medium / 140%
                </p>
              </div>
            </div>

            <div id="typography-effects" className="mt-8 space-y-4 rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                    Accent & Effects
                  </p>
                  <p className="text-medium text-zinc-900">Text Shadows</p>
                </div>
                <code className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-white">
                  uses var(--alabaster)
                </code>
              </div>
              <div className="space-y-3">
                <p className="text-large text-shadow-1">
                  text-shadow: 4.57px 6.09px 0 var(--alabaster);
                </p>
                <p className="text-large text-shadow-2">
                  text-shadow: 8px 8px 1px var(--alabaster);
                </p>
                <p className="text-large text-shadow-3">
                  text-shadow: 5px 6px 1px var(--alabaster);
                </p>
                <p className="text-large text-shadow-4">
                  text-shadow: 3px 4px 0 var(--alabaster);
                </p>
              </div>
            </div>
          </section>

          <section id="color-system" className="space-y-4 rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-zinc-500">
                  Color System
                </p>
                <p className="text-medium text-zinc-900">
                  Brand & UI Swatches
                </p>
                <p className="text-sm text-zinc-500">
                  Each token exposes utility classes via `text-*` and `bg-*`.
                </p>
              </div>
              <p className="text-sm text-zinc-500">
                {colorSwatches.length} tokens
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {colorSwatches.map(({ name, hex, variable, slug }) => (
                <div
                  key={variable}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                  <div
                    className="h-16 w-16 rounded-md border border-black/10"
                    style={{ backgroundColor: hex }}
                  />
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-900">{name}</p>
                    <p className="text-sm text-zinc-500">{hex}</p>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400">
                      {variable}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
