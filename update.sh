#!/bin/bash

set -euo pipefail

APP_DIR="/var/meos"
USER="www-data"
GROUP="www-data"

cd "$APP_DIR"

echo "🔧 Zet Laravel in onderhoudsmodus..."
php artisan down --retry=60 || {
    echo "⚠️ Kon Laravel niet in onderhoudsmodus zetten. Doorgaan..."
}

echo "🔄 Haal laatste wijzigingen op van Git..."
if ! git pull; then
    echo "❌ Git pull mislukt. Controleer je repo of SSH keys."
    php artisan up
    exit 1
fi

echo "🔐 Pas bestandsrechten toe..."
sudo chmod -R 755 storage/* bootstrap/cache/
sudo chown -R $USER:$GROUP "$APP_DIR"

echo "🧼 Cache legen..."
php artisan optimize:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo "📦 Installeer PHP dependencies..."
composer install --no-dev

echo "📦 Installeer Node dependencies..."
if [ -f package-lock.json ]; then
    npm ci
else
    npm install
fi

echo "🏗️ Bouw frontend assets (TypeScript, TSX)..."
npm run build

echo "🛠️ Voer database migraties uit..."
php artisan migrate --force

echo "🔗 Maak storage symlink..."
php artisan storage:link || echo "⚠️ Storage symlink bestaat mogelijk al."

echo "✅ Update voltooid!"

echo "🔓 Laravel uit onderhoudsmodus halen..."
php artisan up

echo "🎉 Applicatie succesvol bijgewerkt!"
