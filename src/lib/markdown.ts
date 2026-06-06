export type MarkdownHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function extractMarkdownHeadings(content: string): MarkdownHeading[] {
  const seen = new Map<string, number>();

  return content
    .split("\n")
    .map((line) => {
      const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);

      if (!match) {
        return null;
      }

      const text = match[2].replace(/[*_`[\]()]/g, "").trim();
      const baseId = slugifyHeading(text) || "section";
      const count = seen.get(baseId) ?? 0;
      seen.set(baseId, count + 1);

      return {
        id: count ? `${baseId}-${count + 1}` : baseId,
        text,
        level: match[1].length as 2 | 3
      };
    })
    .filter((heading): heading is MarkdownHeading => Boolean(heading));
}

export function calculateReadingTime(content: string) {
  const words = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_~\-\d.]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return Math.max(1, Math.ceil(words.length / 225));
}
