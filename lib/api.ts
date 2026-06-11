import { delay } from "./delay";
import type { Comment, Post, Todo, User } from "./types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// "no-store" keeps the route dynamic so streaming stays visible in
// production builds, not just in dev.
async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }
  return res.json();
}

export async function getUsers(): Promise<User[]> {
  await delay(1000);
  return fetchJson<User[]>("/users");
}

export async function getPosts(): Promise<Post[]> {
  await delay(2000);
  const posts = await fetchJson<Post[]>("/posts");
  return posts.slice(0, 10);
}

export async function getTodos(): Promise<Todo[]> {
  await delay(3000);
  return fetchJson<Todo[]>("/todos?userId=1");
}

export async function getComments(): Promise<Comment[]> {
  await delay(1500);
  // Voluntarily broken endpoint (assignment requirement): the 404 makes the
  // fetch throw so the block's error boundary kicks in while the other
  // blocks keep working. Restore "/comments?postId=1" for real data.
  return fetchJson<Comment[]>("/comments-broken?postId=1");
}
