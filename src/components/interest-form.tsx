import { Save, Send } from "lucide-react";
import { saveInterestAction } from "@/app/admin/interests/actions";
import type { AcademicInterest } from "@/lib/database.types";

export function InterestForm({ interest }: { interest?: AcademicInterest | null }) {
  return (
    <form action={saveInterestAction} className="space-y-6 rounded-md border border-line bg-white p-6 shadow-sm">
      {interest ? <input type="hidden" name="id" value={interest.id} /> : null}
      <div>
        <label className="input-label" htmlFor="title">
          Interest title
        </label>
        <input id="title" name="title" className="input-field" defaultValue={interest?.title ?? ""} placeholder="Molecular Biology" required />
      </div>
      <div>
        <label className="input-label" htmlFor="description">
          Explanation
        </label>
        <textarea id="description" name="description" className="textarea-field min-h-40" defaultValue={interest?.description ?? ""} required />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="input-label" htmlFor="displayOrder">
            Display order
          </label>
          <input id="displayOrder" name="displayOrder" className="input-field" type="number" defaultValue={interest?.display_order ?? 100} required />
        </div>
        <div>
          <label className="input-label" htmlFor="status">
            Status
          </label>
          <select id="status" name="status" className="input-field" defaultValue={interest?.status ?? "published"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
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
