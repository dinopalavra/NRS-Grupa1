import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";

const TYPE_LABEL = {
  RESERVATION_CREATED:      "Nova rezervacija",
  RESERVATION_APPROVED:     "Rezervacija odobrena",
  RESERVATION_REJECTED:     "Rezervacija odbijena",
  RESERVATION_CANCELLED:    "Rezervacija otkazana",
  RESERVATION_RESCHEDULED:  "Termin izmijenjen",
  MATCH_SCHEDULED:          "Zakazana utakmica",
  MATCH_RESULT_RECORDED:    "Rezultat unesen",
  INFO:                     "Obavještenje",
};

function formatDateTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString("hr-HR", {
    day:    "2-digit",
    month:  "2-digit",
    year:   "numeric",
    hour:   "2-digit",
    minute: "2-digit"
  });
}

function NotificationBell() {
  const {
    notifications,
    unreadCount,
    loadNotifications,
    markNotificationRead,
    markAllNotificationsRead,
  } = useAppContext();

  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const toggle = async () => {
    if (!open) {
      await loadNotifications();
    }
    setOpen(o => !o);
  };

  const onItemClick = async (n) => {
    if (!n.read) {
      try { await markNotificationRead(n.id); } catch { /* ignore */ }
    }
  };

  const onMarkAll = async () => {
    try { await markAllNotificationsRead(); } catch { /* ignore */ }
  };

  return (
    <div className="notif-wrap" ref={wrapRef}>
      <button
        type="button"
        className={`notif-btn ${unreadCount > 0 ? "has-unread" : ""}`}
        onClick={toggle}
        aria-label="Notifikacije"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        {unreadCount > 0 && (
          <span className="notif-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
        )}
      </button>

      {open && (
        <div className="notif-dropdown">
          <div className="notif-dropdown-header">
            <span className="notif-dropdown-title">Notifikacije</span>
            {notifications.length > 0 && unreadCount > 0 && (
              <button type="button" className="notif-mark-all" onClick={onMarkAll}>
                Označi sve kao pročitano
              </button>
            )}
          </div>
          <div className="notif-list">
            {notifications.length === 0 ? (
              <div className="notif-empty">Nema notifikacija.</div>
            ) : (
              notifications.slice(0, 20).map(n => (
                <button
                  key={n.id}
                  type="button"
                  className={`notif-item ${n.read ? "is-read" : "is-unread"}`}
                  onClick={() => onItemClick(n)}
                >
                  <div className="notif-item-type">{TYPE_LABEL[n.type] || n.type}</div>
                  <div className="notif-item-msg">{n.message}</div>
                  <div className="notif-item-time">{formatDateTime(n.createdAt)}</div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
