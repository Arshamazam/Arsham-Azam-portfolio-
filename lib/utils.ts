export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Prefix a /public path with the base path (needed for GitHub Pages sub-paths). */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

export const doiUrl = (doi: string) => `https://doi.org/${doi}`;
export const arxivUrl = (id: string) => `https://arxiv.org/abs/${id}`;
