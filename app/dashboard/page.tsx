import type { Metadata } from "next";
import { Suspense } from "react";
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
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Vue d&apos;ensemble du projet : chaque bloc s&apos;affiche dès que
          ses données sont prêtes.
        </p>
      </header>

      <div className="grid items-start gap-6 md:grid-cols-2">
        <Suspense fallback={<UsersSkeleton />}>
          <UsersBlock />
        </Suspense>

        <Suspense fallback={<CommentsSkeleton />}>
          <CommentsBlock />
        </Suspense>

        <Suspense fallback={<PostsSkeleton />}>
          <PostsBlock />
        </Suspense>

        <Suspense fallback={<TodosSkeleton />}>
          <TodosBlock />
        </Suspense>
      </div>
    </main>
  );
}
