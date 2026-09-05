import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import FullscreenPreview from "./components/FullscreenPreview";

const pageModules = import.meta.glob("../content/lessons/*.mdx", { eager: true });

const pages = Object.entries(pageModules)
  .map(([path, mod]) => {
    const slug = path.replace("../content/lessons/", "").replace(/\.mdx$/, "");
    return {
      slug,
      title: mod.title ?? slug.replace(/[-_]/g, " "),
      chapter: mod.chapter ?? null,
      Component: mod.default,
    };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

function groupByChapter(items) {
  const groups = [];
  const byChapter = new Map();
  for (const p of items) {
    const key = p.chapter ?? "";
    if (!byChapter.has(key)) {
      const group = { chapter: p.chapter, pages: [] };
      byChapter.set(key, group);
      groups.push(group);
    }
    byChapter.get(key).pages.push(p);
  }
  return groups;
}

function LessonPicker() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentSlug = location.pathname.replace(/^\/l\//, "");
  return (
    <select
      className="lesson-picker shift-arrow"
      value={pages.some((p) => p.slug === currentSlug) ? currentSlug : ""}
      onChange={(e) => navigate(`/l/${e.target.value}`)}
    >
      {groupByChapter(pages).map((group, i) =>
        group.chapter ? (
          <optgroup key={group.chapter} label={group.chapter}>
            {group.pages.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </optgroup>
        ) : (
          group.pages.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))
        ),
      )}
    </select>
  );
}

function LessonLayout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <h1>NYU Coding Course</h1>
        <div className="lesson-picker-container">
          <h2>Lessons</h2>
          <LessonPicker />
        </div>
      </header>
      <main className="content">{children}</main>
    </div>
  );
}

export default function App() {
  const first = pages[0];
  return (
    <Routes>
      <Route path="/p/*" element={<FullscreenPreview />} />
      {pages.map(({ slug, Component }) => (
        <Route
          key={slug}
          path={`/l/${slug}`}
          element={
            <LessonLayout>
              <Component />
            </LessonLayout>
          }
        />
      ))}
      {first && <Route path="*" element={<Navigate to={`/l/${first.slug}`} replace />} />}
    </Routes>
  );
}
