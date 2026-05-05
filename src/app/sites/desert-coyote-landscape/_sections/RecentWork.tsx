import { palette, fonts, photos } from "../_lib/tokens";

// Four real project photos pulled from desertcoyotelandscape.com /photos.
// Captions are placeholder descriptors — owner can correct when we
// confirm the actual project details.
const items = [
  { src: photos.project03, tag: "Paver patio + sod border" },
  { src: photos.project04, tag: "Backyard hardscape build" },
  { src: photos.project06, tag: "Front-yard refresh" },
  { src: photos.project07, tag: "Turf install + curbing" },
];

export function RecentWork() {
  return (
    <section id="recent-work" className="dc2-rw" aria-labelledby="dc2-rw-title">
      <header className="dc2-rw__intro">
        <p className="dc2-rw__eyebrow">RECENT WORK · EAST VALLEY</p>
        <h2 id="dc2-rw-title" className="dc2-rw__title">
          Real installs.<br />Real yards.
        </h2>
        <p className="dc2-rw__lede">
          A few jobs from the last few seasons. We text photos at every
          stage so you always know where your build stands.
        </p>
      </header>
      <ul className="dc2-rw__grid">
        {items.map((it) => (
          <li key={it.src} className="dc2-rw__card">
            <div className="dc2-rw__photo-wrap">
              <img
                className="dc2-rw__photo"
                src={it.src}
                alt={it.tag}
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="dc2-rw__tag">{it.tag}</span>
          </li>
        ))}
      </ul>
      <style>{css}</style>
    </section>
  );
}

const css = `
.dc2-rw {
  background: ${palette.paper};
  color: ${palette.ink};
  padding: 5rem 5vw 6rem;
  font-family: ${fonts.body};
  border-top: 1px solid rgba(27,26,23,0.06);
}
.dc2-rw__intro {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: end;
  max-width: 1200px;
  margin: 0 auto 2.5rem;
}
.dc2-rw__eyebrow {
  font-family: ${fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  color: ${palette.dust};
  text-transform: uppercase;
  margin: 0 0 1rem;
}
.dc2-rw__title {
  grid-column: 1;
  font-family: ${fonts.display};
  font-weight: 400;
  font-size: clamp(2rem, 4.6vw, 3.2rem);
  line-height: 1.0;
  letter-spacing: -0.015em;
  margin: 0;
  color: ${palette.ink};
}
.dc2-rw__lede {
  grid-column: 2;
  font-family: ${fonts.body};
  font-size: 0.95rem;
  line-height: 1.55;
  color: ${palette.dust};
  max-width: 36ch;
  margin: 0 0 0.5rem;
  text-align: right;
}
.dc2-rw__grid {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.dc2-rw__card {
  display: flex; flex-direction: column; gap: 0.6rem;
}
.dc2-rw__photo-wrap {
  aspect-ratio: 4 / 5;
  background: ${palette.bgDeep};
  overflow: hidden;
  border-radius: 2px;
}
.dc2-rw__photo {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 600ms cubic-bezier(0.22, 0.96, 0.32, 1);
  filter: saturate(1.02);
}
.dc2-rw__card:hover .dc2-rw__photo { transform: scale(1.025); }
.dc2-rw__tag {
  font-family: ${fonts.mono};
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${palette.dust};
}
@media (prefers-reduced-motion: reduce) {
  .dc2-rw__photo { transition: none; }
}
@media (max-width: 880px) {
  .dc2-rw { padding: 3.5rem 1.25rem 4rem; }
  .dc2-rw__intro { grid-template-columns: 1fr; gap: 1rem; }
  .dc2-rw__title { grid-column: 1; }
  .dc2-rw__lede { grid-column: 1; text-align: left; }
  .dc2-rw__grid { grid-template-columns: repeat(2, 1fr); }
}
`;
