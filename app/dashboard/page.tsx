import type { Metadata } from "next";
import { BlockCard } from "@/components/dashboard/block-card";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Vue d&apos;ensemble du projet : utilisateurs, posts, todos et
          commentaires.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <BlockCard title="Utilisateurs" delayLabel="~1s">
          <p className="text-sm text-zinc-500">Bientôt disponible.</p>
        </BlockCard>
        <BlockCard title="Commentaires" delayLabel="~1,5s">
          <p className="text-sm text-zinc-500">Bientôt disponible.</p>
        </BlockCard>
        <BlockCard title="Posts" delayLabel="~2s">
          <p className="text-sm text-zinc-500">Bientôt disponible.</p>
        </BlockCard>
        <BlockCard title="Todos" delayLabel="~3s">
          <p className="text-sm text-zinc-500">Bientôt disponible.</p>
        </BlockCard>
      </div>
    </main>
  );
}
