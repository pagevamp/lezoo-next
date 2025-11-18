import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-10 px-6 py-16">
    <header className="space-y-2">
      <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
        Typography system
      </p>
      <h1 className="h1">Heading H1 Utility</h1>
    </header>

    <section className="space-y-6">
      <h2 className="h2">Heading H2 Utility</h2>
      <h3 className="h3">Heading H3 Utility</h3>
      <h4 className="h4">Heading H4 Utility</h4>
    </section>

    <section className="space-y-4">
      <p>
        You can apply the class to any element, for example a
        <span className="h3 inline-block">span with h3</span> or a
        <button className="h4 inline-flex items-center">button heading-h4</button>.
      </p>
    </section>
  </div>
  );
}
