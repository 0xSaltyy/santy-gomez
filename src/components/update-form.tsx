import { Save, Send } from "lucide-react";
import { saveUpdateAction } from "@/app/admin/updates/actions";
import type { UpdateEntry } from "@/lib/database.types";

export function UpdateForm({ update }: { update?: UpdateEntry | null }) {
  return (
    <form action={saveUpdateAction} className="space-y-7 rounded-md border border-line bg-white p-6 shadow-sm">
      {update ? <input type="hidden" name="id" value={update.id} /> : null}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="input-label" htmlFor="title">
            Title
          </label>
          <input id="title" name="title" className="input-field" defaultValue={update?.title ?? ""} placeholder="Update title" required />
        </div>
        <div>
          <label className="input-label" htmlFor="category">
            Category
          </label>
          <input id="category" name="category" className="input-field" defaultValue={update?.category ?? ""} placeholder="Research, Articles, Music" required />
        </div>
        <div>
          <label className="input-label" htmlFor="date">
            Date
          </label>
          <input id="date" name="date" className="input-field" type="date" defaultValue={update?.date ?? new Date().toISOString().slice(0, 10)} required />
        </div>
        <div className="md:col-span-2">
          <label className="input-label" htmlFor="status">
            Publication status
          </label>
          <select id="status" name="status" className="input-field" defaultValue={update?.status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="input-label" htmlFor="summary">
            Short summary
          </label>
          <textarea id="summary" name="summary" className="textarea-field min-h-28" defaultValue={update?.summary ?? ""} required />
        </div>
        <div className="md:col-span-2">
          <label className="input-label" htmlFor="content">
            Full update
          </label>
          <textarea id="content" name="content" className="textarea-field min-h-64" defaultValue={update?.content ?? ""} required />
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
