function Toast({ show, type = "success", message }) {
  if (!show) return null;

  const headerClass = {
    success: "bg-success text-white",
    warning: "bg-warning text-dark",
    danger: "bg-danger text-white",
    info: "bg-primary text-white",
  };

  const title = {
    success: "✅ Success",
    warning: "✏️ Updated",
    danger: "🗑️ Deleted",
    info: "ℹ️ Information",
  };

  return (
    <div
      className="toast show position-fixed top-0 start-50 translate-middle-x mt-4"
      style={{
        zIndex: 9999,
        minWidth: "350px",
      }}
    >
      <div className={`toast-header ${headerClass[type]}`}>
        <strong className="me-auto">{title[type]}</strong>
      </div>

      <div className="toast-body bg-white">{message}</div>
    </div>
  );
}

export default Toast;
