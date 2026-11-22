import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center pt-[var(--header-h)]">
      <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container-x relative">
        <p className="label-mono">
          <span className="text-accent">404</span> · Not found
        </p>
        <h1 className="display mt-6 text-6xl sm:text-8xl">
          Nothing listening <span className="text-muted">on this path.</span>
        </h1>
        <p className="mt-6 max-w-md text-muted">The page you requested doesn&apos;t exist or has moved.</p>
        <Link
          href="/"
          className="mt-10 inline-flex h-12 items-center rounded-[4px] bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-accent"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
