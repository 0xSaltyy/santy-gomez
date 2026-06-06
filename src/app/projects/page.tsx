import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { getPublishedProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects"
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <section className="soft-band bg-paper/70 py-20">
      <div className="container-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Projects</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">Academic and Personal Projects</h1>
          <p className="body-copy mt-6">A formal record of academic work, writing projects, research exploration, music, and selected personal initiatives.</p>
        </Reveal>

        {projects.length ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.04}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="editorial-card mt-10 p-8 text-ink/65">Projects will appear here as they are prepared and published.</div>
        )}
      </div>
    </section>
  );
}
