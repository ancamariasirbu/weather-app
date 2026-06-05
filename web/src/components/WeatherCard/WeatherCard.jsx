import "./WeatherCard.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

function toMinutes(t) {
  if (!t || typeof t !== "string") return null;
  const [h, m] = t.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

// Position the sun along the arc based on how far "now" is between
// sunrise and sunset. The arc is the quadratic bezier drawn below:
//   P0(6,78)  control P1(100,-16)  P2(194,78)
function sunPosition(sunrise, sunset) {
  const r = toMinutes(sunrise);
  const s = toMinutes(sunset);
  let t = 0.5;
  if (r != null && s != null && s > r) {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    t = Math.min(1, Math.max(0, (nowMin - r) / (s - r)));
  }
  const x = (1 - t) ** 2 * 6 + 2 * (1 - t) * t * 100 + t ** 2 * 194;
  const y = (1 - t) ** 2 * 78 + 2 * (1 - t) * t * -16 + t ** 2 * 78;
  return { x, y };
}

function WeatherCard(props) {
  const hasSun = Boolean(props.sunrise && props.sunset);
  const { x, y } = sunPosition(props.sunrise, props.sunset);

  return (
    <div className="weather-card">
      <div className="wc-fav">
        <FavoriteButton city={props.city} />
      </div>

      <div className="wc-main">
        <div className="wc-now">
          <div className="wc-label">Right now</div>
          <h1 className="wc-city">{props.city ?? "—"}</h1>
          <p className="wc-country">{props.country ?? "—"}</p>
          <div className="wc-temp">
            {props.temp ?? "—"}
            <sup>°</sup>
          </div>
          <div className="wc-cond">{props.condition}</div>
        </div>

        <div className="wc-side">
          <div className="wc-glyph">{props.icon}</div>
          {hasSun && (
            <>
              <div className="wc-suntrack">
                <svg viewBox="0 0 200 84" aria-hidden="true">
                  <path
                    d="M6 78 Q100 -16 194 78"
                    fill="none"
                    stroke="rgba(255,180,84,0.35)"
                    strokeWidth="2"
                    strokeDasharray="3 5"
                  />
                  <circle className="wc-sun" cx={x} cy={y} r="6" />
                </svg>
              </div>
              <div className="wc-suntimes">
                <span>
                  Sunrise<b>{props.sunrise}</b>
                </span>
                <span className="right">
                  Sunset<b>{props.sunset}</b>
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="wc-chips">
        <div className="wc-chip">
          <div className="k">Feels like</div>
          <div className="v">{props.feelsLike ?? "—"}°</div>
        </div>
        <div className="wc-chip">
          <div className="k">Wind</div>
          <div className="v">
            {props.windKph ?? "—"}
            <small> km/h</small>
          </div>
        </div>
        <div className="wc-chip">
          <div className="k">Humidity</div>
          <div className="v">{props.humidity ?? "—"}%</div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
