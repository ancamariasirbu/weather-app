import "./ForecastList.css";

// --- helper function ---
function formatWeekday(dateString) {
  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: "long",
    });
  } catch {
    return "—";
  }
}

function ForecastList({ days = [] }) {
  return (
    <ul className="forecast-list">
      {days.map((day) => {
        const weekday = formatWeekday(day.date);
        const min = day.min ?? "—";
        const max = day.max ?? "—";
        const icon = day.icon ?? "unknown";

        return (
          <li key={day.date} className="forecast-item">
            <h3 className="forecast-weekday">{weekday}</h3>
            <div className="forecast-condition">
              <span className="forecast-icon">{icon}</span>
            </div>
            <div className="forecast-temps">
              {min}° / {max}°
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ForecastList;
