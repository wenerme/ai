#!/bin/bash
# Update skills from external repositories
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SKILLS_DIR="$PROJECT_DIR/skills"
GITS_PATH="${GITS_PATH:-$HOME/gits}"

# Ensure a repo is cloned (shallow clone if missing), then pull
#   ensure_repo <repo> [git-url]
#   repo: org/name path under GITS_PATH
#   git-url: defaults to https://github.com/<repo>.git
ensure_repo() {
  local repo=$1
  local url="${2:-https://github.com/$repo.git}"
  local dir="$GITS_PATH/$repo"

  if [ ! -d "$dir" ]; then
    echo "==> Cloning $repo (shallow) ..."
    mkdir -p "$(dirname "$dir")"
    git clone --depth 1 "$url" "$dir"
  else
    echo "==> Pulling $repo ..."
    git -C "$dir" pull
  fi
}

# Sync a skill from a repo into skills/
#   sync_skill <repo> <src-path-in-repo> <skill-name>
sync_skill() {
  local repo=$1
  local src="$GITS_PATH/$repo/$2"
  local dst="$SKILLS_DIR/$3"

  if [ ! -d "$src" ]; then
    echo "    SKIP: $src not found"
    return 1
  fi

  echo "    Syncing $3 ..."
  mkdir -p "$dst"
  rsync -a --delete "$src/" "$dst/"
  echo "    Done: $3"
}

# === vercel/ai ===
ensure_repo vercel/ai
sync_skill vercel/ai skills/use-ai-sdk ai-sdk

# === vercel-labs/agent-browser ===
ensure_repo vercel-labs/agent-browser
sync_skill vercel-labs/agent-browser skills/agent-browser agent-browser

# === ChromeDevTools/chrome-devtools-mcp ===
ensure_repo ChromeDevTools/chrome-devtools-mcp
sync_skill ChromeDevTools/chrome-devtools-mcp skills/chrome-devtools chrome-devtools

# === Add more skills below ===
# ensure_repo org/repo
# sync_skill org/repo path/to/skill skill-name

echo ""
echo "All skills updated."
