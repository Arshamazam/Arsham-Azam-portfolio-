import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-5 py-32 text-center">
      <p className="font-display text-sm font-semibold text-accent">Error 404</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">This page could not be found</h1>
      <p className="mt-4 text-muted">The link may be broken, or the page may have moved.</p>
      <div className="mt-8">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </main>
  );
}
