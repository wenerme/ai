import? 'local.just'

# Update skills table in README.md
update-readme:
    bun scripts/update-readme.ts

# Update skills from external repositories
update-skills:
    bun scripts/update-skills.ts

# Lint skills for best practices
lint-skills:
    bun scripts/lint-skills.ts

# Lint and auto-fix skills
fix-skills:
    bun scripts/lint-skills.ts --fix
