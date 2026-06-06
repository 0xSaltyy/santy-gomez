import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/lib/markdown";

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

function textFromChildren(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    return textFromChildren((children as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  }

  return "";
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const seen = new Map<string, number>();

  function headingId(children: React.ReactNode) {
    const baseId = slugifyHeading(textFromChildren(children)) || "section";
    const count = seen.get(baseId) ?? 0;
    seen.set(baseId, count + 1);
    return count ? `${baseId}-${count + 1}` : baseId;
  }

  return (
    <div className={`article-markdown ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2({ children, ...props }) {
            return (
              <h2 id={headingId(children)} className="scroll-mt-28" {...props}>
                {children}
              </h2>
            );
          },
          h3({ children, ...props }) {
            return (
              <h3 id={headingId(children)} className="scroll-mt-28" {...props}>
                {children}
              </h3>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
