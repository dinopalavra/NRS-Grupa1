package ba.sportsmanager.modules.reservations;

/**
 * Tip rezervacije termina.
 * REGULAR — obična rezervacija termina (npr. utakmica protiv drugog tima,
 *           ad-hoc okupljanje).
 * TRAINING — trening tima; pri kreiranju i promjeni statusa svi članovi
 *            tima dobijaju notifikaciju.
 */
public enum ReservationType {
    REGULAR,
    TRAINING
}
