export const SITE_URL = "https://humaqureshinovels.com";
export const SITE_NAME = "Huma Qureshi Novels";

export function absoluteUrl(path = "") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function cleanDescription(value: unknown, fallback: string) {
  if (!value) return fallback;
  if (typeof value === "string") return value.replace(/\s+/g, " ").trim().slice(0, 160);
  if (Array.isArray(value)) {
    const text = value
      .map((block: any) =>
        Array.isArray(block?.children)
          ? block.children.map((child: any) => child?.text || "").join(" ")
          : "",
      )
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    return (text || fallback).slice(0, 160);
  }
  return fallback;
}
