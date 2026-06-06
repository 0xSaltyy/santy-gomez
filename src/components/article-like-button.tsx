"use client";

import { useEffect, useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { likeArticleAction } from "@/app/articles/actions";
import { getOrCreateVisitorId } from "@/lib/visitor";

type ArticleLikeButtonProps = {
  articleId: string;
  slug: string;
  initialCount: number;
};

export function ArticleLikeButton({ articleId, slug, initialCount }: ArticleLikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const likeKey = `santy-gomez-liked-${articleId}`;

  useEffect(() => {
    setLiked(window.localStorage.getItem(likeKey) === "true");
  }, [likeKey]);

  function like() {
    if (liked || isPending) {
      return;
    }

    const formData = new FormData();
    formData.set("articleId", articleId);
    formData.set("slug", slug);
    formData.set("visitorId", getOrCreateVisitorId());

    startTransition(async () => {
      const result = await likeArticleAction(formData);

      if (result.ok) {
        window.localStorage.setItem(likeKey, "true");
        setLiked(true);
        setCount((value) => value + 1);
      }

      setMessage(result.message);
    });
  }

  return (
    <div className="mt-8 rounded-lg border border-white/75 bg-white/70 p-4 shadow-soft backdrop-blur-xl print:hidden">
      <button type="button" className={`button-secondary min-h-10 ${liked ? "border-blush/60 text-wine" : ""}`} onClick={like} disabled={liked || isPending}>
        <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} aria-hidden="true" />
        {liked ? "Appreciated" : "Appreciate this article"}
        <span className="rounded-full bg-paper px-2 py-0.5 text-xs">{count}</span>
      </button>
      {message ? <p className="mt-2 text-sm text-ink/55">{message}</p> : null}
    </div>
  );
}
