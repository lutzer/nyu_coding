import { Link, Route, Routes, Navigate } from "react-router-dom";

const pageModules = import.meta.glob("./content/*.mdx", { eager: true });

const pages = Object.entries(pageModules)
  .map(([path, mod]) => {
    const slug = path.replace("./content/", "").replace(/\.mdx$/, "");
    return {
      slug,
      title: mod.title ?? slug.replace(/[-_]/g, " "),
      Component: mod.default,
    };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

export default function App() {
  const first = pages[0];
  return (
    <div className="layout">
      <nav className="sidebar">
        <h2>Lessons</h2>
        <ul>
          {pages.map((p) => (
            <li key={p.slug}>
              <Link to={`/${p.slug}`}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="content">
        <Routes>
          {pages.map(({ slug, Component }) => (
            <Route key={slug} path={`/${slug}`} element={<Component />} />
          ))}
          {first && <Route path="*" element={<Navigate to={`/${first.slug}`} replace />} />}
        </Routes>
      </main>
    </div>
  );
}
