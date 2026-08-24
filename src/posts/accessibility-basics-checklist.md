# Accessibility Basics Every Web Project Should Ship With

Accessibility is often treated as a final audit instead of a design constraint. Building these habits in from the start costs almost nothing and removes most of the rework later.

## Structure with real headings and landmarks

Screen readers navigate by heading hierarchy and landmark regions, not by visual appearance. A `<div>` styled to look like a heading is invisible to that navigation model — use semantic `<h1>`–`<h6>`, `<nav>`, `<main>`, and `<footer>` elements.

## Every interactive element needs a visible focus state

Removing the default focus outline without replacing it locks out keyboard users. A clear, high-contrast focus ring is not optional styling — it is core functionality.

## Color contrast is a requirement, not a preference

Text and its background should meet at least a 4.5:1 contrast ratio for body copy. Tools like the WebAIM contrast checker catch this in seconds during design review, before it becomes a launch blocker.

## Label every form field

Placeholder text disappears the moment a user starts typing, and doesn't reliably reach assistive technology. Pair every input with a real `<label>`, even when it's visually hidden with a `.sr-only` utility.

## Test with a keyboard, not just a mouse

Tab through your own interface before shipping it. If you cannot reach every action without a mouse, neither can a portion of your users.

> Accessible design is simply thorough design — it just gets noticed by more people.
