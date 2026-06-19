# Next.js Streaming Dashboard

> **Élève : Alley Ben Hassine**

Dashboard analytique pour une application de gestion de projets. La page `/dashboard` affiche 4 blocs de données indépendants (utilisateurs, posts, todos, commentaires) **streamés indépendamment** : chaque bloc apparaît dès que ses données sont disponibles, sans jamais bloquer les autres ni la page.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir [http://localhost:3000/dashboard](http://localhost:3000/dashboard) (la racine `/` y redirige).

Pour vérifier le comportement en production :

```bash
npm run build
npm run start
```

## Comportement attendu

Au chargement, les 4 skeletons apparaissent immédiatement, puis :

| Bloc | Endpoint | Délai simulé | Résultat |
|---|---|---|---|
| Utilisateurs | `/users` | 1 000 ms | ✅ données à ~1s |
| Commentaires | `/comments?postId=1` | 1 500 ms | ❌ **erreur simulée** à ~1,5s |
| Posts | `/posts` (10 premiers) | 2 000 ms | ✅ données à ~2s |
| Todos | `/todos?userId=1` | 3 000 ms | ✅ données à ~3s |

La page n'attend jamais le bloc le plus lent : le shell (titre + skeletons) est envoyé en ~100ms, le premier bloc arrive à ~1s, le dernier à ~3s.

## Architecture de rendu

```
app/
  page.tsx                      → redirige vers /dashboard
  dashboard/page.tsx            → Server Component synchrone : 4 boundaries Suspense granulaires
components/dashboard/
  users-block.tsx               → Server Component async (fetch /users)
  posts-block.tsx               → Server Component async (fetch /posts)
  todos-block.tsx               → Server Component async (fetch /todos?userId=1)
  comments-block.tsx            → Server Component async (fetch volontairement cassé)
  skeletons.tsx                 → 4 skeletons personnalisés, calqués sur le contenu réel de chaque bloc
  block-error-boundary.tsx      → error boundary client (seul "use client" du projet)
  block-card.tsx                → carte UI partagée
lib/
  delay.ts                      → fonction de simulation de latence du sujet (non modifiée)
  api.ts                        → un fetch indépendant par bloc (cache: "no-store")
  types.ts                      → types User, Post, Todo, Comment
```

### Pourquoi ça streame

- `app/dashboard/page.tsx` est **synchrone** : aucun `await`, aucun `Promise.all`. Il rend directement 4 `<Suspense>` contenant chacun un Server Component async.
- React démarre donc les 4 fetches **en parallèle** et envoie le HTML de chaque bloc dès que sa promesse résout — c'est le streaming SSR de l'App Router.
- Chaque boundary a son **skeleton dédié** (même structure que le contenu final → pas de layout shift).
- Les fetches utilisent `cache: "no-store"`, ce qui rend la route dynamique : le streaming est visible aussi en production, pas seulement en dev.

### Gestion d'erreurs par bloc

`error.tsx` ne fonctionne qu'au niveau route : une erreur ferait tomber toute la page. Pour isoler les pannes **par bloc**, chaque `<Suspense>` est enveloppé dans une **error boundary client** (`block-error-boundary.tsx`) :

```tsx
<BlockErrorBoundary blockName="Commentaires">
  <Suspense fallback={<CommentsSkeleton />}>
    <CommentsBlock />
  </Suspense>
</BlockErrorBoundary>
```

Une erreur jetée par un Server Component pendant le streaming remonte à la boundary client la plus proche. Le fetch des commentaires est **volontairement cassé** (endpoint inexistant → 404 → `throw`) dans `lib/api.ts` : le bloc Commentaires affiche son UI d'erreur à ~1,5s pendant que les 3 autres blocs continuent de se charger et de s'afficher normalement.

Le bloc en erreur propose un bouton **« Réessayer »**. Comme le Server Component a déjà été rendu (en échec) côté serveur, réinitialiser la boundary ne suffit pas : le bouton appelle `router.refresh()` (qui relance le rendu serveur, donc le fetch) **et** `reset()` de la boundary, le tout dans un `startTransition`. React remplace alors le rendu en échec par le nouveau payload serveur. Comme l'endpoint reste cassé dans cette démo, le bloc repasse par son skeleton puis ré-affiche l'erreur ; sur une vraie erreur transitoire, il afficherait les données.

Pour rétablir le bloc, remettre `"/comments?postId=1"` dans `getComments()`.

## Contraintes du sujet respectées

- ✅ App Router uniquement (`/app`)
- ✅ Aucun `use client` sur les composants de données (le seul composant client est l'error boundary, qui ne touche pas aux données)
- ✅ Aucun `useEffect` / fetch côté client pour les données
- ✅ Suspense avec boundaries granulaires (une par bloc)
- ✅ Skeleton personnalisé par bloc, pas de spinner global
- ✅ Fetches indépendants, pas de `Promise.all` global
- ✅ Erreur simulée sur CommentsBlock, les 3 autres blocs fonctionnent

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS 4 · [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
