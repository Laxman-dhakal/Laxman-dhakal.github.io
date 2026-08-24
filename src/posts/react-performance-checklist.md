# A Practical React Performance Checklist

Most performance problems in React apps come from a handful of repeatable causes: unnecessary re-renders, oversized bundles, and unoptimized media. Here is the checklist I run through on every client project before shipping.

## 1. Measure before optimizing

Open the React DevTools Profiler and record a real interaction — a filter, a route change, a form submit. Guessing where the slowdown lives wastes more time than the fix itself.

## 2. Split the bundle by route

Lazy-load pages with `React.lazy` and `Suspense` so the initial bundle only contains what the landing route needs. A dashboard, an admin panel, or a rarely-visited settings page should never block the first paint.

## 3. Memoize with intent, not by default

`useMemo`, `useCallback`, and `React.memo` are not free. Reach for them when a component re-renders with the same props but still does expensive work — not on every function you write.

## 4. Optimize images before optimizing code

A single unresized hero image usually costs more than a dozen re-renders. Serve responsive `srcSet` images, use modern formats like WebP or AVIF, and lazy-load anything below the fold.

## 5. Keep state close to where it is used

Global state that updates frequently forces wide re-render trees. Local component state, or scoped context providers, keep updates contained to the parts of the UI that actually changed.

> Performance work is never "done" — it is a budget you protect on every pull request.
