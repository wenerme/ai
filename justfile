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

# Fetch OpenAI developer docs (api, sdk, docs)
update-openai-docs:
    bun scripts/fetch-openai-docs.ts

# Fetch OpenRouter docs
update-openrouter-docs:
    bun scripts/fetch-openrouter-docs.ts

# Fetch Google AI (Gemini) docs
update-google-ai-docs:
    bun scripts/fetch-google-ai-docs.ts

# Sync Bun docs from local oven-sh/bun clone
update-bun-docs:
    bun scripts/sync-bun-docs.ts

# Sync Grafana docs from local grafana/grafana clone
update-grafana-docs:
    bun scripts/sync-grafana-docs.ts

# Update all: external skills + all docs + README
update: update-skills update-claude-code-docs update-anthropic-docs update-openai-docs update-openrouter-docs update-google-ai-docs update-bun-docs update-grafana-docs update-readme

# Lint skills for best practices
lint-skills:
    bun scripts/lint-skills.ts

# Lint and auto-fix skills
fix-skills:
    bun scripts/lint-skills.ts --fix
