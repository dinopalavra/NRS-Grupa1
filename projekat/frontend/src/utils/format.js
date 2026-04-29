export function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("bs-BA");
}

export function statusLabel(status) {
  const map = {
    pending: "Na čekanju",
    approved: "Odobrena",
    rejected: "Odbijena",
    cancelled: "Otkazana",
    active: "Aktivno",
    completed: "Završeno",
    ACTIVE: "Aktivan"
  };

  return map[status] || status;
}