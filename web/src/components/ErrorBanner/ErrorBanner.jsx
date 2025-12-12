import "./ErrorBanner.css";

function ErrorBanner({ message, onRetry }) {
  return (
    <div role="alert">
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

function ErrorText() {
  return (
    <div className="error-card" role="alert">
      <p className="error-text">Something went wrong. Please try again.</p>
    </div>
  );
}

export { ErrorBanner, ErrorText };
