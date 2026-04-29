import { courseStats, courseCharacter } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function CourseAtAGlance() {
  const stats: { label: string; value: string; placeholder: boolean }[] = [
    { label: "Holes", value: String(courseStats.holes.value), placeholder: courseStats.holes.isPlaceholder },
    { label: "Par",   value: String(courseStats.par.value),   placeholder: courseStats.par.isPlaceholder },
    { label: "Yardage (back)", value: courseStats.yardageBack.value, placeholder: courseStats.yardageBack.isPlaceholder },
    { label: "Course rating",  value: courseStats.rating.value,      placeholder: courseStats.rating.isPlaceholder },
  ];

  return (
    <section id="course-at-a-glance" className="la-glance">
      <p className="la-glance__eyebrow">The course</p>
      <h2 className="la-glance__pull">"{courseCharacter}"</h2>
      <ul className="la-glance__stats">
        {stats.map((s) => (
          <li key={s.label}>
            <span className="la-glance__stat-value">
              {s.value}
              {s.placeholder && <sup className="la-glance__placeholder" title="Placeholder — owner to confirm">*</sup>}
            </span>
            <span className="la-glance__stat-label">{s.label}</span>
          </li>
        ))}
      </ul>
      <p className="la-glance__designer">{courseStats.designer.value}</p>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-glance { padding: 8rem 5vw 7rem; background: ${palette.paper}; color: ${palette.charcoal}; text-align: center; max-width: 1200px; margin: 0 auto; }
.la-glance__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 2.5rem; }
.la-glance__pull { font-family: ${fonts.display}; font-style: italic; font-weight: 400; font-size: clamp(1.4rem, 3.4vw, 2.4rem); line-height: 1.35; max-width: 26ch; margin: 0 auto 4rem; color: ${palette.water}; }
.la-glance__stats { list-style: none; padding: 0; margin: 0 auto 3rem; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.5rem 2rem; max-width: 880px; border-top: 1px solid rgba(26,26,26,0.18); border-bottom: 1px solid rgba(26,26,26,0.18); padding: 2.75rem 0; }
.la-glance__stats li { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.la-glance__stat-value { font-family: ${fonts.display}; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 400; color: ${palette.water}; position: relative; }
.la-glance__placeholder { color: ${palette.dawn}; font-family: ${fonts.body}; font-size: 0.6em; vertical-align: super; padding-left: 0.15rem; }
.la-glance__stat-label { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.24em; text-transform: uppercase; color: ${palette.smoke}; }
.la-glance__designer { font-family: ${fonts.body}; font-size: 0.85rem; letter-spacing: 0.05em; color: ${palette.smoke}; font-style: italic; margin: 0; }
@media (max-width: 720px) { .la-glance__stats { grid-template-columns: repeat(2, 1fr); } }
`;
