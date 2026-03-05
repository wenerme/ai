import? 'local.just'

# Update skills table in README.md
update-readme:
    bun scripts/update-readme.ts

# Update skills from external repositories
update-skills:
    bun scripts/update-skills.ts

# Fetch Claude Code docs from code.claude.com + CHANGELOG
update-claude-code-docs:
    bun scripts/fetch-claude-code-docs.ts

# Fetch Anthropic platform docs (api, sdk, agent-sdk, docs)
update-anthropic-docs:
    bun scripts/fetch-anthropic-api-docs.ts

# Update all: external skills + claude-code-docs + anthropic-docs + README
update: update-skills update-claude-code-docs update-anthropic-docs update-readme

# Lint skills for best practices
lint-skills:
    bun scripts/lint-skills.ts

# Lint and auto-fix skills
fix-skills:
    bun scripts/lint-skills.ts --fix
