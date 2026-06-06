"use client";

import { useState } from "react";
import { Eye, Save, Send, Sparkles } from "lucide-react";
import { saveArticleAction } from "@/app/admin/articles/actions";
import type { Article } from "@/lib/database.types";
import { MarkdownRenderer } from "@/components/markdown-renderer";

export function ArticleForm({ article }: { article?: Article | null }) {
  const [content, setContent] = useState(article?.content ?? "");

  return (
    <form action={saveArticleAction} className="space-y-7 rounded-lg border border-white/70 bg-white/80 p-6 shadow-glow backdrop-blur-xl">
      {article ? <input type="hidden" name="id" value={article.id} /> : null}
      <input type="hidden" name="existingImageUrl" value={article?.image_url ?? ""} />

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="input-label" htmlFor="title">
            Title
          </label>
          <input id="title" name="title" className="input-field" defaultValue={article?.title ?? ""} placeholder="Article title" required />
        </div>
        <div>
          <label className="input-label" htmlFor="category">
            Category
          </label>
          <input id="category" name="category" className="input-field" defaultValue={article?.category ?? ""} placeholder="Science, Law, Culture" required />
        </div>
        <div>
          <label className="input-label" htmlFor="date">
            Date
          </label>
          <input id="date" name="date" className="input-field" type="date" defaultValue={article?.date ?? new Date().toISOString().slice(0, 10)} required />
        </div>
        <div>
          <label className="input-label" htmlFor="status">
            Status
          </label>
          <select id="status" name="status" className="input-field" defaultValue={article?.status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label className="input-label" htmlFor="image">
            Optional article image
          </label>
          <input id="image" name="image" className="input-field" type="file" accept="image/*" />
          {article?.image_url ? (
            <a href={article.image_url} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-sm font-semibold text-forest hover:text-ink">
              View current image
            </a>
          ) : null}
        </div>
        <div className="md:col-span-2">
          <label className="input-label" htmlFor="preview">
            Short preview
          </label>
          <textarea id="preview" name="preview" className="textarea-field min-h-28" defaultValue={article?.preview ?? ""} placeholder="A concise summary for the article list." required />
        </div>
        <div className="md:col-span-2">
          <label className="input-label" htmlFor="abstract">
            Optional abstract
          </label>
          <textarea
            id="abstract"
            name="abstract"
            className="textarea-field min-h-32"
            defaultValue={article?.abstract ?? ""}
            placeholder="A polished academic summary of the article's central question, argument, or purpose."
          />
        </div>
        <div className="md:col-span-2">
          <label className="input-label" htmlFor="keywords">
            Optional keywords
          </label>
          <input
            id="keywords"
            name="keywords"
            className="input-field"
            defaultValue={article?.keywords ?? ""}
            placeholder="intelligence failure, national security, cognitive bias"
          />
          <p className="mt-2 text-sm leading-6 text-ink/55">Separate keywords with commas. They will appear as small badges on the public article.</p>
        </div>
        <div className="md:col-span-2">
          <label className="input-label" htmlFor="author_note">
            Optional author or publication note
          </label>
          <textarea
            id="author_note"
            name="author_note"
            className="textarea-field min-h-24"
            defaultValue={article?.author_note ?? ""}
            placeholder="A short note about context, publication timing, class assignment, or revision status."
          />
        </div>
        <div className="md:col-span-2">
          <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
            <div>
              <label className="input-label" htmlFor="content">
                Full article body
              </label>
              <textarea
                id="content"
                name="content"
                className="textarea-field min-h-[420px] font-mono text-sm leading-7"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder={"# Main Heading\n\nWrite the full article here with Markdown formatting."}
                required
              />
            </div>
            <aside className="rounded-lg border border-cyan/30 bg-gradient-to-br from-white/90 via-cyan/10 to-lavender/15 p-5 shadow-soft">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-forest" aria-hidden="true" />
                <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-forest">Markdown Guide</p>
              </div>
              <div className="mt-4 space-y-2 text-sm leading-6 text-ink/70">
                <p><code>#</code> main heading</p>
                <p><code>##</code> section heading</p>
                <p><code>**bold**</code> emphasis</p>
                <p><code>*italic*</code> nuance</p>
                <p><code>-</code> bullet list</p>
                <p><code>&gt;</code> quote block</p>
                <p><code>[link](https://...)</code></p>
              </div>
            </aside>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="rounded-lg border border-white/70 bg-paper/70 p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-forest" aria-hidden="true" />
              <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-forest">Preview Formatting</p>
            </div>
            <div className="mt-5 rounded-lg border border-line bg-white/85 p-5">
              {content.trim() ? <MarkdownRenderer content={content} className="text-base" /> : <p className="text-sm text-ink/55">Your Markdown preview will appear here while you write.</p>}
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="input-label" htmlFor="sources">
            Sources and citations
          </label>
          <textarea
            id="sources"
            name="sources"
            className="textarea-field min-h-40"
            defaultValue={article?.sources ?? ""}
            placeholder="Paste references, citations, source notes, or links here. Markdown links and lists are supported."
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
        <button type="submit" name="intent" value="keep" className="button-secondary">
          <Save className="h-4 w-4" aria-hidden="true" />
          Save changes
        </button>
        <button type="submit" name="intent" value="draft" className="button-secondary">
          <Save className="h-4 w-4" aria-hidden="true" />
          Save draft
        </button>
        <button type="submit" name="intent" value="publish" className="button-primary">
          <Send className="h-4 w-4" aria-hidden="true" />
          Publish
        </button>
      </div>
    </form>
  );
}
