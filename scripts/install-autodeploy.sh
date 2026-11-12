#!/usr/bin/env bash
# One-time setup, run as root ON THE SERVER:
#   GH_USER=Zaryab03 GH_TOKEN=<token> bash scripts/install-autodeploy.sh
# Stores the GitHub token (mode 600, web2's home only) and installs a cron job
# that checks GitHub every minute. The token is never written to the repo.
set -euo pipefail

APP_USER="${APP_USER:-web2}"
APP_DIR="${APP_DIR:-/var/www/speedhost360}"
: "${GH_USER:?set GH_USER}"; : "${GH_TOKEN:?set GH_TOKEN}"

HOME_DIR=$(getent passwd "$APP_USER" | cut -d: -f6)
PM2_BIN=$(sudo -u "$APP_USER" bash -lc 'command -v pm2')
NODE_DIR=$(dirname "$(sudo -u "$APP_USER" bash -lc 'command -v node')")

# Saved credentials for future git operations
sudo -u "$APP_USER" git config --global credential.helper store
install -m 600 -o "$APP_USER" -g "$APP_USER" /dev/null "$HOME_DIR/.git-credentials"
echo "https://${GH_USER}:${GH_TOKEN}@github.com" > "$HOME_DIR/.git-credentials"
git config --global --add safe.directory "$APP_DIR" || true

# Deploy script
install -m 755 -o "$APP_USER" -g "$APP_USER" "$APP_DIR/scripts/deploy.sh" "$HOME_DIR/deploy.sh"

# Cron: every minute
CRON="PATH=${NODE_DIR}:$(dirname "$PM2_BIN"):/usr/local/bin:/usr/bin:/bin
* * * * * $HOME_DIR/deploy.sh"
echo "$CRON" | crontab -u "$APP_USER" -
echo "Installed. Watch with: tail -f $HOME_DIR/deploy.log"
