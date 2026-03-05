import? 'local.just'

# Update skills table in README.md
update-readme:
    bun scripts/update-readme.ts

# Update skills from external repositories
update-skills:
    bun scripts/update-skills.ts

# Update claude-code-docs from local mirror
update-claude-code-docs:
    cd ~/gits/ericbuess/claude-code-docs && git pull --ff-only
    rsync -a --delete ~/gits/ericbuess/claude-code-docs/docs/*.md skills/claude-code-docs/references/

# Update all: external skills + claude-code-docs + README
update: update-skills update-claude-code-docs update-readme

# Lint skills for best practices
lint-skills:
    bun scripts/lint-skills.ts

# Lint and auto-fix skills
fix-skills:
    bun scripts/lint-skills.ts --fix
