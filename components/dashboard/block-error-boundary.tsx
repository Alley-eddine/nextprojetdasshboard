"use client";

import { Component, type ReactNode } from "react";

type BlockErrorBoundaryProps = {
  blockName: string;
  children: ReactNode;
};

type BlockErrorBoundaryState = {
  hasError: boolean;
};

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

  render() {
    if (this.state.hasError) {
      return (
        <section
          role="alert"
          className="flex flex-col rounded-xl border border-red-200 bg-red-50 shadow-sm dark:border-red-900/60 dark:bg-red-950/30"
        >
          <header className="flex items-center justify-between border-b border-red-200 px-5 py-3 dark:border-red-900/60">
            <h2 className="text-sm font-semibold text-red-800 dark:text-red-300">
              {this.props.blockName}
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
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
