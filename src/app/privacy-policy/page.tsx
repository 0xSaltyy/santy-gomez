import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Simple privacy policy for the Santy Gomez website, explaining that unnecessary personal information is not collected.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <section className="soft-band bg-paper/70 py-20">
      <div className="container-shell max-w-3xl">
        <Reveal>
          <p className="eyebrow">Privacy</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">Privacy Policy</h1>
          <div className="glass-panel mt-8 space-y-6 p-7">
            <p className="body-copy">
              This website does not collect unnecessary personal information. Visitors can read public pages without creating an account or submitting personal details.
            </p>
            <p className="body-copy">
              If contact forms, analytics, newsletters, or other data-collecting features are added later, this policy should be updated to explain what information is collected, how it is used, and how visitors can make privacy-related requests.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
