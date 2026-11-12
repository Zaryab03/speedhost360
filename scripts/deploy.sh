#!/usr/bin/env bash
# Auto-deploy: runs from cron as the app user (web2). If origin/main has new
# commits it stops the app, pulls, installs/builds, and restarts it.
set -uo pipefail

APP_DIR="${APP_DIR:-/var/www/speedhost360}"
PM2_NAME="${PM2_NAME:-speedhost360}"
BRANCH="${BRANCH:-main}"
LOG="${LOG:-$HOME/deploy.log}"

exec 9>"/tmp/${PM2_NAME}-deploy.lock"
flock -n 9 || exit 0   # a deploy is already running

log() { echo "[$(date '+%F %T')] $*" >> "$LOG"; }

cd "$APP_DIR" || { log "cannot cd to $APP_DIR"; exit 1; }

git fetch --quiet origin "$BRANCH" || { log "git fetch failed"; exit 1; }
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse "origin/$BRANCH")
[ "$LOCAL" = "$REMOTE" ] && exit 0

log "New commits ${LOCAL:0:7} -> ${REMOTE:0:7}, deploying"
OLD_LOCK=$(git rev-parse HEAD:package-lock.json 2>/dev/null || echo none)

pm2 stop "$PM2_NAME" >> "$LOG" 2>&1
# Always bring the app back up, even if pull/build fails.
trap 'pm2 start "$PM2_NAME" >> "$LOG" 2>&1; log "pm2 start issued"' EXIT

git pull --ff-only origin "$BRANCH" >> "$LOG" 2>&1 || { log "git pull failed"; exit 1; }

NEW_LOCK=$(git rev-parse HEAD:package-lock.json 2>/dev/null || echo none)
if [ "$OLD_LOCK" != "$NEW_LOCK" ]; then
  log "package-lock changed, running npm ci"
  npm ci >> "$LOG" 2>&1 || { log "npm ci failed"; exit 1; }
fi

npm run build >> "$LOG" 2>&1 || { log "BUILD FAILED, restarting previous build"; exit 1; }
log "Deploy finished at $(git rev-parse --short HEAD)"
