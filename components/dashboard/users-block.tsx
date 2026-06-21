import CountUp from "@/components/reactbits/CountUp";
import { getUsers } from "@/lib/api";
import { BlockCard } from "./block-card";

export async function UsersBlock() {
  const users = await getUsers();

  return (
    <BlockCard title="Utilisateurs" delayLabel="~1s">
      <ul className="space-y-3">
        {users.slice(0, 5).map((user) => (
          <li key={user.id} className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
            >
              {user.name.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {user.name}
              </p>
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                {user.email}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-zinc-500">
        <CountUp to={users.length} /> utilisateurs au total
      </p>
    </BlockCard>
  );
}
