---
description: Create Previews from Workers Builds, GitHub Actions, or another CI system.
title: Examples
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Examples

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/previews/examples/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use `npx wrangler preview` directly in automation. Before you start, review [Resources and isolation](https://developers.cloudflare.com/workers/previews/resources/).

## Workers Builds

If your Worker is connected to Cloudflare, enable [Preview Builds](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/#configure-preview-builds) and confirm the [Preview command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#preview-command) is `npx wrangler preview`. Workers Builds creates the Preview and comments its URL on the pull request.

## GitHub Actions

### Add repository secrets

Add your Cloudflare credentials to the repository:

```sh
gh auth login
gh secret set CLOUDFLARE_API_TOKEN
gh secret set CLOUDFLARE_ACCOUNT_ID
```

The API token needs permission to edit Workers Scripts and the resources used by the Preview. GitHub provides `${{ secrets.GITHUB_TOKEN }}` automatically.

Repository secrets are unavailable to forked pull requests by default. Before exposing Cloudflare credentials, verify that `github.event.pull_request.head.repo.full_name == github.repository`.

### Create and comment on a Preview

This workflow creates one Preview per pull request and comments its URL:

*.github/workflows/preview.ymlyaml*

```yaml
name: Preview

on:
  pull_request:
    types: [opened, synchronize, reopened, closed]

permissions:
  contents: read
  pull-requests: write

jobs:
  preview:
    if: github.event.action != 'closed'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - id: preview
        name: Create or update Preview
        run: |
          set -o pipefail
          output="$(npx wrangler preview --name "pr-${{ github.event.pull_request.number }}" --json)"
          printf '%s\n' "$output"
          preview_url="$(printf '%s' "$output" | jq -er '.preview_urls[0] // .preview.urls[0]')"
          echo "preview_url=$preview_url" >> "$GITHUB_OUTPUT"
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
      - name: Comment Preview URL
        run: gh pr comment "${{ github.event.pull_request.number }}" --body "Preview: ${{ steps.preview.outputs.preview_url }}"
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Add required install or build steps before the Preview step. GitHub-hosted Ubuntu runners include `jq`, which the workflow uses to read the Preview URL.

To update one comment instead of creating a new comment on each run, add `--edit-last --create-if-none` to `gh pr comment`.

### Probe the Preview

Add a request that verifies the deployed Preview:

*.github/workflows/preview.ymlyaml*

```yaml
- name: Probe Preview
  run: curl --fail --show-error --silent "$PREVIEW_URL/api/health"
  env:
    PREVIEW_URL: ${{ steps.preview.outputs.preview_url }}
```

Replace `/api/health` with a route that verifies your Worker. If the probe fails, use [Workers Observability](https://developers.cloudflare.com/workers/observability/) or [Test and debug](https://developers.cloudflare.com/workers/previews/test-and-debug/).

### Capture a screenshot

Capture the rendered Preview as a workflow artifact:

*.github/workflows/preview.ymlyaml*

```yaml
- name: Capture Preview screenshot
  run: |
    npx --yes playwright install --with-deps chromium
    npx --yes playwright screenshot "$PREVIEW_URL" preview.png
  env:
    PREVIEW_URL: ${{ steps.preview.outputs.preview_url }}

- uses: actions/upload-artifact@v4
  with:
    name: preview-screenshot
    path: preview.png
```

For hosted browser checks, use the Browser Run [screenshot endpoint](https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/).

### Delete closed pull request Previews

The workflow trigger above includes the `closed` event. Add this cleanup job under `jobs`:

*.github/workflows/preview.ymlyaml*

```yaml
cleanup:
  if: github.event.action == 'closed'
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Delete Preview
      run: npx wrangler preview delete --name "pr-${{ github.event.pull_request.number }}" --skip-confirmation
      env:
        CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### Use wrangler-action instead

If you prefer a wrapper, use [`cloudflare/wrangler-action` ↗](https://github.com/cloudflare/wrangler-action). It exposes Preview URLs as outputs and can create a GitHub Deployment.

## Monorepo with multiple Workers

Preview names are scoped to a Worker. In a monorepo, each Worker can have a Preview with the same pull request name:

```sh
cd workers/api && npx wrangler preview --name "pr-123"
cd ../web && npx wrangler preview --name "pr-123"
```

Service bindings between these Previews resolve to the bound Worker's production deployment. Refer to [Limitations](https://developers.cloudflare.com/workers/previews/resources/#limitations).

## Other CI systems

For other CI systems, run:

```sh
npx wrangler preview --name "$BRANCH_NAME" --json
```

Use the JSON output to post the Preview URL to your review tool.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/previews/examples/#page","headline":"Examples","description":"Create Previews from Workers Builds, GitHub Actions, or another CI system.","url":"https://developers.cloudflare.com/workers/previews/examples/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
