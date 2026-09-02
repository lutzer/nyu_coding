import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";

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

function LessonPicker() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentSlug = location.pathname.replace(/^\//, "");
  return (
    <select
      className="lesson-picker"
      value={pages.some((p) => p.slug === currentSlug) ? currentSlug : ""}
      onChange={(e) => navigate(`/${e.target.value}`)}
    >
      {pages.map((p) => (
        <option key={p.slug} value={p.slug}>
          {p.title}
        </option>
      ))}
    </select>
  );
}

export default function App() {
  const first = pages[0];
  return (
    <div className="layout">
      <header className="header">
        <h1>Coding Course</h1>
        <div className="lesson-picker-container">
          <h2>Lessons</h2>
          <LessonPicker />
        </div>
      </header>
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
