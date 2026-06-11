import { getPosts } from "@/lib/api";
import { BlockCard } from "./block-card";

export async function PostsBlock() {
  const posts = await getPosts();

  return (
    <BlockCard title="Posts" delayLabel="~2s">
      <ol className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="flex items-baseline gap-2">
            <span className="shrink-0 text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
              #{post.id}
            </span>
            <p className="truncate text-sm text-zinc-700 dark:text-zinc-300">
              {post.title}
            </p>
          </li>
        ))}
      </ol>
    </BlockCard>
  );
}
