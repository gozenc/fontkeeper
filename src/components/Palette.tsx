export default function Palette() {
  return (
    <section id="palette">
      <div className="palette__input">
        <span>Hue</span>
        <span>217</span>
        <input type="range" />
      </div>
      <div className="palette__input">
        <span className="palette__input--title">Saturation</span>
        <span className="palette__input--value">70%</span>
        <input type="range" />
      </div>
      <div className="palette__input">
        <span className="palette__input--title">Lightness</span>
        <span className="palette__input--value">70%</span>
        <input type="range" />
      </div>
    </section>
  );
}
