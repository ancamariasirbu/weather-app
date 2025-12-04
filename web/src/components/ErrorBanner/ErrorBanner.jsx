import "./ErrorBanner.css";

function ErrorBanner({ message, onRetry }) {
  return (
    <div role="alert">
      <p className="errorMessage">{message}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorBanner;
