"use client";

import { Component, type ReactNode, useTransition } from "react";
import { useRouter } from "next/navigation";

type BlockErrorBoundaryProps = {
  blockName: string;
  children: ReactNode;
};

type BlockErrorBoundaryState = {
  hasError: boolean;
};

// The error UI lives in its own function component so it can use hooks
// (a class component cannot). router.refresh() re-runs the route's server
// components (re-fetch); reset() clears the boundary. Running both inside a
// transition lets React swap in the fresh server payload instead of
// instantly replaying the failed render.
function BlockErrorFallback({
  blockName,
  onReset,
}: {
  blockName: string;
  onReset: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      onReset();
    });
  };

  return (
    <section
      role="alert"
      className="flex flex-col rounded-xl border border-red-200 bg-red-50 shadow-sm dark:border-red-900/60 dark:bg-red-950/30"
    >
      <header className="flex items-center justify-between border-b border-red-200 px-5 py-3 dark:border-red-900/60">
        <h2 className="text-sm font-semibold text-red-800 dark:text-red-300">
          {blockName}
        </h2>
        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-600 dark:bg-red-900/50 dark:text-red-400">
          erreur
        </span>
      </header>
      <div className="flex-1 px-5 py-4">
        <p className="text-sm font-medium text-red-800 dark:text-red-300">
          Impossible de charger ce bloc.
        </p>
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
          Une erreur est survenue pendant la récupération des données. Les
          autres blocs du dashboard ne sont pas impactés.
        </p>
        <button
          type="button"
          onClick={handleRetry}
          disabled={isPending}
          aria-busy={isPending}
          className="mt-4 inline-flex items-center rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/40"
        >
          {isPending ? "Nouvelle tentative…" : "Réessayer"}
        </button>
      </div>
    </section>
  );
}

// next/error.tsx only works at the route level and would take the whole
// page down. Per-block isolation needs a client error boundary around each
// Suspense boundary: an error thrown by a server component while streaming
// bubbles up to the nearest client boundary, leaving the other blocks
// untouched.
export class BlockErrorBoundary extends Component<
  BlockErrorBoundaryProps,
  BlockErrorBoundaryState
> {
  state: BlockErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): BlockErrorBoundaryState {
    return { hasError: true };
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <BlockErrorFallback
          blockName={this.props.blockName}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}
