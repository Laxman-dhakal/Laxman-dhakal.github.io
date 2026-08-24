# From Figma to Production: A Handoff Workflow That Works

Design handoff breaks down when developers and designers work from different assumptions about spacing, states, and edge cases. This is the workflow I use to keep a design system honest from mockup to shipped feature.

## Start with tokens, not pixels

Before building a single component, agree on the shared values: color palette, spacing scale, type ramp, and radii. Once those live in code as CSS variables or a Tailwind config, every component inherits consistency automatically.

## Design the states, not just the happy path

A button mockup shows one state. Production needs five: default, hover, focus, disabled, and loading. Ask for all of them during design review — retrofitting states after launch is where visual drift begins.

## Build in the browser early

Static mockups hide real content problems: long names, empty states, translated text that expands. Building a rough version in the browser during design review catches these issues while they are still cheap to fix.

## Treat responsive behavior as a requirement, not an afterthought

Every component should have an intended behavior at mobile, tablet, and desktop widths documented before development starts, not discovered during QA.

> The best handoff process is the one that makes the design system impossible to ignore.
