import "./ForecastList.css";

// Parse a "YYYY-MM-DD" string as a LOCAL date (avoids the UTC shift that
// `new Date("2026-06-06")` causes, which can land on the wrong weekday).
function parseLocalDate(dateString) {
  const [y, m, d] = dateString.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function isToday(date) {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function formatDay(dateString) {
  try {
    const date = parseLocalDate(dateString);
    if (isToday(date)) return "Today";
    return date.toLocaleDateString(undefined, { weekday: "short" });
  } catch {
    return "—";
  }
}

// `currentIcon` is the hero's live "right now" icon. The Today card uses it so
// it stays consistent with the main card (whose icon reflects current
// conditions, not the midday forecast that future-day cards use).
function ForecastList({ days = [], currentIcon }) {
  if (!days.length) return null;

  return (
    <section className="forecast-section">
      <h3 className="forecast-title">5-day forecast</h3>
      <ul className="forecast-list">
        {days.map((day, i) => {
          const label = formatDay(day.date);
          const isTodayCard = label === "Today";
          const min = day.min ?? "—";
          const max = day.max ?? "—";
          const icon =
            isTodayCard && currentIcon ? currentIcon : day.icon ?? "—";

          return (
            <li
              key={day.date}
              className={`forecast-item${isTodayCard ? " is-today" : ""}`}
              style={{ animationDelay: `${0.18 + i * 0.06}s` }}
            >
              <span className="forecast-weekday">{label}</span>
              <span className="forecast-icon">{icon}</span>
              <span className="forecast-hi">{max}°</span>
              <span className="forecast-lo">{min}°</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ForecastList;
