import { Save } from "lucide-react";
import { saveProfileAction } from "@/app/admin/content/actions";
import type { SiteProfile } from "@/lib/database.types";

export function ProfileForm({ profile }: { profile: SiteProfile }) {
  return (
    <form action={saveProfileAction} className="space-y-6 rounded-md border border-line bg-white p-6 shadow-sm">
      <div>
        <label className="input-label" htmlFor="aboutIntro">
          About intro
        </label>
        <textarea id="aboutIntro" name="aboutIntro" className="textarea-field min-h-28" defaultValue={profile.about_intro} required />
      </div>
      <div>
        <label className="input-label" htmlFor="aboutBody">
          About body
        </label>
        <textarea id="aboutBody" name="aboutBody" className="textarea-field min-h-40" defaultValue={profile.about_body} required />
      </div>
      <div>
        <label className="input-label" htmlFor="interestsIntro">
          Academic interests intro
        </label>
        <textarea id="interestsIntro" name="interestsIntro" className="textarea-field min-h-28" defaultValue={profile.interests_intro} required />
      </div>
      <div>
        <label className="input-label" htmlFor="futureGoals">
          Future goals
        </label>
        <textarea id="futureGoals" name="futureGoals" className="textarea-field min-h-48" defaultValue={profile.future_goals} required />
      </div>
      <div className="flex justify-end border-t border-line pt-6">
        <button type="submit" className="button-primary">
          <Save className="h-4 w-4" aria-hidden="true" />
          Save content
        </button>
      </div>
    </form>
  );
}
