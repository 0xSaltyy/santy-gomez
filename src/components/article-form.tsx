import { Save, Send } from "lucide-react";
import { saveArticleAction } from "@/app/admin/articles/actions";
import type { Article } from "@/lib/database.types";

export function ArticleForm({ article }: { article?: Article | null }) {
  return (
    <form action={saveArticleAction} className="space-y-7 rounded-md border border-line bg-white p-6 shadow-sm">
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
          <label className="input-label" htmlFor="content">
            Full article body
          </label>
          <textarea id="content" name="content" className="textarea-field min-h-[360px]" defaultValue={article?.content ?? ""} placeholder="Write the full article here." required />
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
            placeholder="Paste references, citations, source notes, or links here. These will appear at the bottom of the article."
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
