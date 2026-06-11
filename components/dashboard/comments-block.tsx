import { getComments } from "@/lib/api";
import { BlockCard } from "./block-card";

export async function CommentsBlock() {
  const comments = await getComments();

  return (
    <BlockCard title="Commentaires" delayLabel="~1,5s">
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id}>
            <p className="truncate text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {comment.email}
            </p>
            <p className="mt-0.5 line-clamp-2 text-sm text-zinc-700 dark:text-zinc-300">
              {comment.body}
            </p>
          </li>
        ))}
      </ul>
    </BlockCard>
  );
}
