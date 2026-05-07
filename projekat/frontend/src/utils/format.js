export function formatDate(dateString) {
  if (!dateString) return "-";

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}.`;
  }

  return new Date(dateString).toLocaleDateString("bs-BA");
}

export function formatTime(timeString) {
  if (!timeString) return "-";
  return String(timeString).slice(0, 5);
}

export function statusLabel(status) {
  const map = {
    AVAILABLE: "Dostupan",
    RESERVED: "Rezervisan",
    BLOCKED: "Blokiran",
    PENDING: "Na čekanju",
    APPROVED: "Odobrena",
    REJECTED: "Odbijena",
    CANCELLED: "Otkazana",
    available: "Dostupan",
    reserved: "Rezervisan",
    blocked: "Blokiran",
    pending: "Na čekanju",
    approved: "Odobrena",
    rejected: "Odbijena",
    cancelled: "Otkazana"
  };

  return map[status] || status || "-";
}