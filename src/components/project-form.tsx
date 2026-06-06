import { Save, Send } from "lucide-react";
import { saveProjectAction } from "@/app/admin/projects/actions";
import type { Project } from "@/lib/database.types";

export function ProjectForm({ project }: { project?: Project | null }) {
  return (
    <form action={saveProjectAction} className="space-y-7 rounded-md border border-line bg-white p-6 shadow-sm">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}
      <input type="hidden" name="existingImageUrl" value={project?.image_url ?? ""} />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="input-label" htmlFor="title">
            Project title
          </label>
          <input id="title" name="title" className="input-field" defaultValue={project?.title ?? ""} placeholder="Project title" required />
        </div>
        <div>
          <label className="input-label" htmlFor="category">
            Category
          </label>
          <input id="category" name="category" className="input-field" defaultValue={project?.category ?? ""} placeholder="Research, Writing, Music" required />
        </div>
        <div>
          <label className="input-label" htmlFor="date">
            Date
          </label>
          <input id="date" name="date" className="input-field" type="date" defaultValue={project?.date ?? new Date().toISOString().slice(0, 10)} required />
        </div>
        <div>
          <label className="input-label" htmlFor="projectStatus">
            Project status
          </label>
          <input id="projectStatus" name="projectStatus" className="input-field" defaultValue={project?.project_status ?? ""} placeholder="Planning, In progress, Completed" required />
        </div>
        <div>
          <label className="input-label" htmlFor="publicationStatus">
            Publication status
          </label>
          <select id="publicationStatus" name="publicationStatus" className="input-field" defaultValue={project?.publication_status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label className="input-label" htmlFor="linkUrl">
            Optional link
          </label>
          <input id="linkUrl" name="linkUrl" className="input-field" type="url" defaultValue={project?.link_url ?? ""} placeholder="https://..." />
        </div>
        <div>
          <label className="input-label" htmlFor="image">
            Optional image
          </label>
          <input id="image" name="image" className="input-field" type="file" accept="image/*" />
          {project?.image_url ? (
            <a href={project.image_url} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-sm font-semibold text-forest hover:text-ink">
              View current image
            </a>
          ) : null}
        </div>
        <div className="md:col-span-2">
          <label className="input-label" htmlFor="description">
            Short description
          </label>
          <textarea id="description" name="description" className="textarea-field min-h-48" defaultValue={project?.description ?? ""} required />
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
