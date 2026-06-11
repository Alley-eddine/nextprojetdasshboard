import type { ReactNode } from "react";

type BlockCardProps = {
  title: string;
  delayLabel: string;
  children: ReactNode;
};

export function BlockCard({ title, delayLabel, children }: BlockCardProps) {
  return (
    <section className="flex flex-col rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <header className="flex items-center justify-between border-b border-zinc-200 px-5 py-3 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {delayLabel}
        </span>
      </header>
      <div className="flex-1 px-5 py-4">{children}</div>
    </section>
  );
}
