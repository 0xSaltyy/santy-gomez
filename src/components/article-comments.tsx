"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Send } from "lucide-react";
import { addArticleCommentAction } from "@/app/articles/actions";
import type { ArticleComment } from "@/lib/database.types";
import { formatDate } from "@/lib/format";
import { getOrCreateVisitorId } from "@/lib/visitor";

type ArticleCommentsProps = {
  articleId: string;
  slug: string;
  comments: ArticleComment[];
};

export function ArticleComments({ articleId, slug, comments }: ArticleCommentsProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const cooldownKey = `santy-gomez-comment-cooldown-${articleId}`;

  function submitComment(formData: FormData) {
    const lastCommentAt = Number(window.localStorage.getItem(cooldownKey) ?? 0);
    const now = Date.now();

    if (now - lastCommentAt < 60_000) {
      setMessage("Please wait a minute before posting another comment.");
      return;
    }

    formData.set("articleId", articleId);
    formData.set("slug", slug);
    formData.set("visitorId", getOrCreateVisitorId());

    startTransition(async () => {
      const result = await addArticleCommentAction(formData);
      setMessage(result.message);

      if (result.ok) {
        window.localStorage.setItem(cooldownKey, String(now));
        formRef.current?.reset();
        router.refresh();
      }
    });
  }

  return (
    <section className="mt-12 rounded-lg border border-white/75 bg-white/70 p-6 shadow-soft backdrop-blur-xl print:hidden">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-forest" aria-hidden="true" />
        <h2 className="font-display text-2xl font-bold text-ink">Comments</h2>
      </div>
      <p className="mt-3 text-sm leading-7 text-ink/60">Comments should remain respectful and relevant. I may remove comments that are spam, abusive, or unrelated.</p>

      <form ref={formRef} action={submitComment} className="mt-6 grid gap-4">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div>
          <label className="input-label" htmlFor="displayName">Display name</label>
          <input id="displayName" name="displayName" className="input-field" minLength={2} maxLength={60} required />
        </div>
        <div>
          <label className="input-label" htmlFor="content">Comment</label>
          <textarea id="content" name="content" className="textarea-field min-h-28" minLength={12} maxLength={1200} required />
        </div>
        <button type="submit" className="button-primary w-fit" disabled={isPending}>
          <Send className="h-4 w-4" aria-hidden="true" />
          {isPending ? "Publishing" : "Publish comment"}
        </button>
        {message ? <p className="text-sm text-ink/60">{message}</p> : null}
      </form>

      <div className="mt-8 space-y-4">
        {comments.length ? (
          comments.map((comment) => (
            <article key={comment.id} className="rounded-lg border border-line bg-paper/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-base font-bold text-ink">{comment.display_name}</h3>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">{formatDate(comment.created_at)}</p>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink/70">{comment.content}</p>
            </article>
          ))
        ) : (
          <p className="rounded-lg border border-line bg-paper/70 p-4 text-sm text-ink/60">No comments yet. You can start the conversation with something thoughtful and relevant.</p>
        )}
      </div>
    </section>
  );
}
