#!/bin/bash
# Build chili-design.plugin from the source. Run from anywhere:  bash scripts/build-plugin.sh
# Runs the static checks first; the eval suite and macOS files are not packaged.
set -euo pipefail
repo="$(cd "$(dirname "$0")/.." && pwd)"
node "$repo/scripts/check-plugin.mjs"
tmp="$(mktemp -d)"
( cd "$repo/plugins/chili-design" && zip -q -r "$tmp/chili-design.plugin" . -x 'evals/*' -x '*.DS_Store' )
cp "$tmp/chili-design.plugin" "$repo/chili-design.plugin"
echo "Built $repo/chili-design.plugin ($(unzip -l "$repo/chili-design.plugin" | tail -1 | awk '{print $2}') entries)"
