import { BlockCard } from "./block-card";

// One custom skeleton per block, shaped after the block's real content,
// so the layout does not shift when data streams in.

function Line({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-800 ${className}`}
    />
  );
}

export function UsersSkeleton() {
  return (
    <BlockCard title="Utilisateurs" delayLabel="~1s" loading>
      <ul className="space-y-3">
        {Array.from({ length: 5 }, (_, i) => (
          <li key={i} className="flex items-center gap-3">
            <div className="size-8 shrink-0 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="w-full space-y-1.5">
              <Line className="h-3 w-2/5" />
              <Line className="h-2.5 w-3/5" />
            </div>
          </li>
        ))}
      </ul>
      <Line className="mt-4 h-2.5 w-1/3" />
    </BlockCard>
  );
}

export function PostsSkeleton() {
  return (
    <BlockCard title="Posts" delayLabel="~2s" loading>
      <ul className="space-y-3">
        {Array.from({ length: 10 }, (_, i) => (
          <li key={i} className="flex items-center gap-2">
            <Line className="h-3 w-6 shrink-0" />
            <Line className={`h-3 ${i % 3 === 0 ? "w-4/5" : "w-3/5"}`} />
          </li>
        ))}
      </ul>
    </BlockCard>
  );
}

export function TodosSkeleton() {
  return (
    <BlockCard title="Todos" delayLabel="~3s" loading>
      <Line className="mb-4 h-2.5 w-1/4" />
      <ul className="space-y-3">
        {Array.from({ length: 8 }, (_, i) => (
          <li key={i} className="flex items-center gap-2">
            <div className="size-4 shrink-0 animate-pulse rounded border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800" />
            <Line className={`h-3 ${i % 2 === 0 ? "w-3/4" : "w-1/2"}`} />
          </li>
        ))}
      </ul>
    </BlockCard>
  );
}

export function CommentsSkeleton() {
  return (
    <BlockCard title="Commentaires" delayLabel="~1,5s" loading>
      <ul className="space-y-4">
        {Array.from({ length: 5 }, (_, i) => (
          <li key={i} className="space-y-1.5">
            <Line className="h-2.5 w-2/5" />
            <Line className="h-3 w-full" />
            <Line className="h-3 w-4/5" />
          </li>
        ))}
      </ul>
    </BlockCard>
  );
}
