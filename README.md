# NYU Coding Course

Lesson site for the *Augment the Gallery* NYU coding course. Lessons are written in MDX and rendered as a single-page React app, with interactive code examples powered by [Sandpack](https://sandpack.codesandbox.io/).

## Getting started

```bash
npm install
npm run dev
```

Then open the URL printed by Vite.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — build the production bundle to `dist/`
- `npm run preview` — preview the production build locally

## Project layout

```
content/
  lessons/     MDX lesson files (filenames prefix sort order, e.g. 14_assets.mdx)
  snippets/    Source files used by interactive Sandpack snippets
public/
  lesson-images/   Images referenced from lessons
src/
  App.jsx                   Router, lesson picker, layout
  components/
    SandpackSnippet.jsx     Embedded interactive code editor
    FullscreenPreview.jsx   Standalone preview route (/p/*)
    snippetFiles.js         Loads snippet source files
  styles.css
vite.config.js   Vite + MDX + rehype-pretty-code setup
```

## Adding a lesson

1. Create a new MDX file in `content/lessons/`. Prefix the filename with a number to control order (e.g. `23_state.mdx`).
2. Export a `title` and optionally a `chapter`:

   ```mdx
   export const title = "State";
   export const chapter = "Chapter 2 — React";

   # State

   ...
   ```

3. For an interactive snippet, add source files under `content/snippets/<folder>/` and embed with:

   ```mdx
   <SandpackSnippet folder="<folder>" template="static" activeFile="/index.html" />
   ```

The lesson picker is populated automatically from the files in `content/lessons/`.

## Deployment

The build is configured with `base: '/nyu_coding/'` in `vite.config.js` for hosting under that path (e.g. GitHub Pages). Change this if deploying elsewhere.
