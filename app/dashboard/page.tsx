import type { Metadata } from "next";
import { Suspense } from "react";
import Aurora from "@/components/reactbits/Aurora";
import GradientText from "@/components/reactbits/GradientText";
import { BlockErrorBoundary } from "@/components/dashboard/block-error-boundary";
import { CommentsBlock } from "@/components/dashboard/comments-block";
import { PostsBlock } from "@/components/dashboard/posts-block";
import {
  CommentsSkeleton,
  PostsSkeleton,
  TodosSkeleton,
  UsersSkeleton,
} from "@/components/dashboard/skeletons";
import { TodosBlock } from "@/components/dashboard/todos-block";
import { UsersBlock } from "@/components/dashboard/users-block";

export const metadata: Metadata = {
  title: "Dashboard",
};

// This page stays synchronous on purpose: no await here means every block
// starts fetching in parallel and streams in through its own Suspense
// boundary as soon as its data resolves. The page never waits for the
// slowest block.
export default function DashboardPage() {
  return (
    <main className="relative mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      {/* Decorative animated background, kept behind the content and out of
          the accessibility tree. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute inset-x-0 top-0 h-[70vh] opacity-60">
          <Aurora
            colorStops={["#6366f1", "#8b5cf6", "#22d3ee"]}
            amplitude={1.0}
            blend={0.6}
          />
        </div>
      </div>

      <header className="mb-8">
        <h1 className="sr-only">Dashboard</h1>
        <div aria-hidden className="mb-1">
          <GradientText
            className="text-3xl font-bold mx-0! cursor-default!"
            colors={["#818cf8", "#c084fc", "#22d3ee"]}
          >
            Dashboard
          </GradientText>
        </div>
        <p className="text-sm text-zinc-400">
          Vue d&apos;ensemble du projet : chaque bloc s&apos;affiche dès que
          ses données sont prêtes.
        </p>
      </header>

      <div className="grid items-start gap-6 md:grid-cols-2">
        <BlockErrorBoundary blockName="Utilisateurs">
          <Suspense fallback={<UsersSkeleton />}>
            <UsersBlock />
          </Suspense>
        </BlockErrorBoundary>

        <BlockErrorBoundary blockName="Commentaires">
          <Suspense fallback={<CommentsSkeleton />}>
            <CommentsBlock />
          </Suspense>
        </BlockErrorBoundary>

        <BlockErrorBoundary blockName="Posts">
          <Suspense fallback={<PostsSkeleton />}>
            <PostsBlock />
          </Suspense>
        </BlockErrorBoundary>

        <BlockErrorBoundary blockName="Todos">
          <Suspense fallback={<TodosSkeleton />}>
            <TodosBlock />
          </Suspense>
        </BlockErrorBoundary>
      </div>
    </main>
  );
}
