export default function ProgressBar({ progress }) {
  return (
    <div className="progress-wrap">
      <div className="progress-header">
        <span className="progress-label">Completion</span>
        <span className="progress-pct">{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
