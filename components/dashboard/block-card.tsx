import type { ReactNode } from "react";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

type BlockCardProps = {
  title: string;
  delayLabel: string;
  children: ReactNode;
  // Set on the skeleton variant so assistive tech announces the block as
  // busy while its data streams in.
  loading?: boolean;
};

export function BlockCard({
  title,
  delayLabel,
  children,
  loading = false,
}: BlockCardProps) {
  return (
    <section aria-busy={loading} className="h-full">
      <SpotlightCard
        className="flex h-full flex-col rounded-xl! border-zinc-800! bg-zinc-900/70! p-0! shadow-sm backdrop-blur-sm"
        spotlightColor="rgba(129, 140, 248, 0.18)"
      >
        <header className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
          <h2 className="text-sm font-semibold text-zinc-50">{title}</h2>
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
            {delayLabel}
          </span>
        </header>
        <div className="flex-1 px-5 py-4">
          {loading && <span className="sr-only">Chargement du bloc {title}…</span>}
          {children}
        </div>
      </SpotlightCard>
    </section>
  );
}
