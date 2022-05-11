#!/bin/sh
curl -f http://localhost:${PORT:-3000}/health || exit 1
