#!/bin/sh

# causes the shell to exit if any subcommand or pipeline returns a non-zero status.
set -e

echo "run data create..."
npm run db:create

echo "start the app..."
exec "$@"