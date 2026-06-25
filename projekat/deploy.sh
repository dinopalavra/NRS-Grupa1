#!/usr/bin/env bash
# =============================================================================
# Sports Manager — Deployment skripta
# Pokrece kompletni sistem (PostgreSQL + Backend + Frontend) putem Docker Compose
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "========================================"
echo "  Sports Manager — Deployment"
echo "========================================"
echo ""

# Provjera preduvjeta
command -v docker >/dev/null 2>&1 || { echo "GRESKA: Docker nije instaliran. Instalirajte Docker Desktop."; exit 1; }
docker compose version >/dev/null 2>&1 || docker-compose version >/dev/null 2>&1 || { echo "GRESKA: Docker Compose nije dostupan."; exit 1; }

echo "[1/4] Zaustavljanje prethodnih kontejnera (ako postoje)..."
docker compose down --remove-orphans 2>/dev/null || true

echo "[2/4] Buildovanje Docker image-a..."
docker compose build --no-cache

echo "[3/4] Pokretanje servisa..."
docker compose up -d

echo "[4/4] Cekanje da backend postane dostupan..."
MAX_WAIT=90
ELAPSED=0
until curl -sf http://localhost:8080/api/auth/ping >/dev/null 2>&1; do
  if [ $ELAPSED -ge $MAX_WAIT ]; then
    echo "GRESKA: Backend nije odgovorio nakon ${MAX_WAIT}s."
    echo "Provjerite logove: docker compose logs backend"
    exit 1
  fi
  sleep 3
  ELAPSED=$((ELAPSED + 3))
  echo "  Cekam backend... (${ELAPSED}s)"
done

echo ""
echo "========================================"
echo "  DEPLOYMENT USPJESAN!"
echo "========================================"
echo ""
echo "  Frontend:  http://localhost:3000"
echo "  Backend:   http://localhost:8080"
echo "  Baza:      localhost:5432 (sportsmanager)"
echo ""
echo "  Registracija: kliknite 'Registracija' na login stranici"
echo "  Uloge: ADMIN, CAPTAIN, PLAYER, MANAGER"
echo ""
echo "  Zaustavljanje: docker compose down"
echo "  Logovi:        docker compose logs -f"
echo "========================================"
