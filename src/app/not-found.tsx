import { CtaLink } from "@/components/ui/button-link";

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
        <CtaLink href="/" className="mt-10">
          Back to home
        </CtaLink>
      </div>
    </section>
  );
}
