# React Starter

A small React + Vite boilerplate with a router (Gallery + Detail pages).

## Run it

Open a terminal in this folder and install the dependencies once:

```
npm install
```

Then start the dev server:

```
npm run dev
```

Vite will print a URL (usually `http://localhost:5173`). Open it in your
browser. Saving a file reloads the page automatically.

## Build it

```
npm run build
```

The production files land in `dist/`.

## Files

- `index.html` — page shell; loads `src/main.jsx`
- `public/logo.svg` — site logo, served from `/logo.svg`
- `src/main.jsx` — React entry point
- `src/App.jsx` — the router + layout (header, main, footer)
- `src/Header.jsx` — site header with logo and nav
- `src/Footer.jsx` — site footer
- `src/Hero.jsx` — hero section on the gallery page
- `src/Gallery.jsx` — gallery page
- `src/Detail.jsx` — detail page
- `src/data.json` — the paintings
- `src/styles.css` — all the styling
- `vite.config.js` — Vite + React plugin
