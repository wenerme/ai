---
name: terraform-docs
description: "Use when working with the terraform-docs CLI for generating Terraform module documentation: markdown/asciidoc/json/yaml/toml/xml/tfvars output formats, .terraform-docs.yml configuration, formatter options, output injection, recursive modules, sections visibility, pre-commit hooks, GitHub Actions, plugins, or terraform-docs troubleshooting."
---

# terraform-docs

Official terraform-docs CLI documentation synced from [`terraform-docs/terraform-docs/docs`](https://github.com/terraform-docs/terraform-docs/tree/master/docs).

Use this skill for the `terraform-docs` tool that generates documentation from Terraform modules. This is not the HashiCorp Terraform language/provider/state/backend documentation; for Terraform core behavior, use Terraform's official docs instead.

## Content Scope

The upstream docs tree contains 42 Markdown files and is cleanly organized. This skill syncs all `docs/**/*.md`:

- `references/user-guide/` — installation, introduction, configuration file, formatter, sections, output behavior, recursive modules, sorting, settings, content/header/footer, output-values, version.
- `references/reference/` — CLI command reference and output formats: markdown, asciidoc, json, yaml, toml, xml, pretty, tfvars hcl/json.
- `references/how-to/` — configuration file usage, GitHub Action, pre-commit hooks, include examples, insert output to file, ignore resources, recursive submodules, false CLI flags, visibility of sections, generate tfvars.
- `references/developer-guide/` — contributing and plugin development.

Only Markdown docs are included; repository source, examples outside `docs/`, images, releases, and generated artifacts are not bundled.

## Hard Rules

- MUST search `references/` before giving terraform-docs CLI flags, config keys, formatter names, output modes, output formats, recursive behavior, section visibility, hooks, or GitHub Action guidance.
- MUST distinguish `terraform-docs` CLI behavior from Terraform core behavior such as HCL syntax, provider schemas, backend/state, `terraform plan`, or `terraform apply`.
- MUST call out the output format when relevant: `markdown table`, `markdown document`, `asciidoc`, `json`, `yaml`, `toml`, `xml`, `pretty`, `tfvars hcl`, or `tfvars json`.
- NEVER invent `.terraform-docs.yml` keys, CLI flags, formatter names, output-mode values, or plugin behavior without checking references.

## Fast Lookup

```bash
rg -n "output-file|output-mode|inject|replace|template|recursive|sections|show|hide" skills/terraform-docs/references
rg -n "markdown table|markdown document|asciidoc|json|yaml|toml|xml|tfvars|pretty" skills/terraform-docs/references
rg -n "\.terraform-docs\.yml|formatter|settings|sort|content|header-from|footer-from" skills/terraform-docs/references
rg -n "pre-commit|GitHub Action|plugin|ignore|examples|submodule" skills/terraform-docs/references
```

## Reference Map

- `references/user-guide/introduction.md` — usage model and generated documentation basics.
- `references/user-guide/configuration.md` — `.terraform-docs.yml` overview.
- `references/user-guide/configuration/*.md` — configuration details.
- `references/reference/terraform-docs.md` — CLI command reference.
- `references/reference/markdown-table.md` and `markdown-document.md` — common Markdown formatters.
- `references/how-to/insert-output-to-file.md` — README injection workflows.
- `references/how-to/pre-commit-hooks.md` and `github-action.md` — automation integrations.
- `references/developer-guide/plugins.md` — plugin development.

## Workflow

1. Identify whether the question is CLI usage, config file, output format, output injection, automation, recursion, filtering/sections, or plugin development.
2. Search the relevant reference subtree and format-specific page.
3. Prefer exact documented CLI flags, config keys, formatter names, and `output.mode` semantics.
4. Redirect Terraform core questions to Terraform language/provider docs when terraform-docs is not the source of truth.
