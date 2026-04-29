import { courseStats, courseCharacter } from "../_lib/content";
import { palette, fonts, photos } from "../_lib/tokens";

// Two-column editorial: large photo left, copy + stat row right.
// Replaces the v1 centered pull-quote layout.

export function CourseAtAGlance() {
  const stats: { label: string; value: string; placeholder: boolean }[] = [
    { label: "Holes",         value: String(courseStats.holes.value), placeholder: courseStats.holes.isPlaceholder },
    { label: "Par",           value: String(courseStats.par.value),   placeholder: courseStats.par.isPlaceholder },
    { label: "Yardage (back)",value: courseStats.yardageBack.value,   placeholder: courseStats.yardageBack.isPlaceholder },
    { label: "Course rating", value: courseStats.rating.value,        placeholder: courseStats.rating.isPlaceholder },
  ];

  return (
    <section id="course" className="la-glance" aria-labelledby="la-glance-title">
      <div className="la-glance__photo-wrap">
        <img
          className="la-glance__photo"
          src={photos.course1}
          alt="A view down the seventh fairway in late afternoon light"
          loading="lazy"
          decoding="async"
        />
        <span className="la-glance__caption">HOLE 07 · LATE AFTERNOON</span>
      </div>
      <div className="la-glance__copy">
        <p className="la-glance__eyebrow">
          <span>THE COURSE</span>
          <span className="la-glance__rule" aria-hidden="true" />
          <span>18 HOLES</span>
        </p>
        <h2 id="la-glance-title" className="la-glance__title">
          A walk you <em>won't forget.</em>
        </h2>
        <p className="la-glance__lede">{courseCharacter}</p>
        <ul className="la-glance__stats" aria-label="Course at a glance">
          {stats.map((s) => (
            <li key={s.label}>
              <span className="la-glance__stat-value">
                {s.value}
                {s.placeholder && (
                  <sup className="la-glance__placeholder" title="Placeholder — owner to confirm">*</sup>
                )}
              </span>
              <span className="la-glance__stat-label">{s.label}</span>
            </li>
          ))}
        </ul>
        <p className="la-glance__designer">{courseStats.designer.value}</p>
      </div>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-glance {
  display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
  gap: 4rem; align-items: center;
  padding: 6rem 2.5rem;
  background: ${palette.paper};
  color: ${palette.ink};
  font-family: ${fonts.body};
  border-top: 1px solid rgba(22,20,15,0.06);
}
.la-glance__photo-wrap {
  position: relative;
  aspect-ratio: 5/4;
  background: ${palette.paperDeep};
  overflow: hidden;
  border-radius: 2px;
}
.la-glance__photo {
  width: 100%; height: 100%; object-fit: cover; display: block;
  filter: saturate(1.04);
  transition: transform 700ms ${"cubic-bezier(0.22,0.96,0.32,1)"};
}
.la-glance__photo-wrap:hover .la-glance__photo { transform: scale(1.02); }
.la-glance__caption {
  position: absolute; bottom: 1rem; left: 1rem;
  font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.24em; text-transform: uppercase;
  color: ${palette.bone}; background: rgba(22,20,15,0.55); padding: 0.35rem 0.6rem; border-radius: 2px;
  backdrop-filter: blur(6px);
}
.la-glance__copy { display: flex; flex-direction: column; gap: 1.5rem; max-width: 520px; }
.la-glance__eyebrow {
  display: inline-flex; align-items: center; flex-wrap: wrap; gap: 0.65rem;
  font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0;
}
.la-glance__rule { display: inline-block; width: 22px; height: 1px; background: currentColor; opacity: 0.45; }
.la-glance__title {
  font-family: ${fonts.display}; font-weight: 400;
  font-size: clamp(2.1rem, 4.6vw, 3.1rem); line-height: 1.05;
  letter-spacing: -0.015em; margin: 0; max-width: 14ch;
  font-variation-settings: "opsz" 144, "SOFT" 30;
}
.la-glance__title em {
  font-style: italic; color: ${palette.moss};
  font-variation-settings: "opsz" 96, "SOFT" 70;
}
.la-glance__lede {
  font-family: ${fonts.body}; font-size: 1.02rem; line-height: 1.6;
  color: ${palette.ink}; opacity: 0.82; margin: 0; max-width: 44ch;
}
.la-glance__stats {
  list-style: none; padding: 1.5rem 0; margin: 0.5rem 0 0;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;
  border-top: 1px solid rgba(22,20,15,0.18);
  border-bottom: 1px solid rgba(22,20,15,0.18);
}
.la-glance__stats li { display: flex; flex-direction: column; gap: 0.4rem; }
.la-glance__stat-value {
  font-family: ${fonts.mono}; font-size: clamp(1.3rem, 2.2vw, 1.7rem);
  font-weight: 500; color: ${palette.moss}; line-height: 1;
  letter-spacing: -0.01em;
}
.la-glance__placeholder {
  color: ${palette.brick}; font-family: ${fonts.body};
  font-size: 0.6em; vertical-align: super; padding-left: 0.15rem;
}
.la-glance__stat-label {
  font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: ${palette.ash};
}
.la-glance__designer {
  font-family: ${fonts.mono}; font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0;
}
@media (prefers-reduced-motion: reduce) {
  .la-glance__photo { transition: none; transform: none; }
}
@media (max-width: 920px) {
  .la-glance { grid-template-columns: 1fr; gap: 2.5rem; padding: 4rem 1.25rem; }
  .la-glance__stats { grid-template-columns: repeat(2, 1fr); }
}
`;
