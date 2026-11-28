---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Migrate a static site or Jekyll site from GitHub Pages to Cloudflare Workers with Static Assets.
title: Migrate from GitHub Pages to Workers
image: https://developers.cloudflare.com/workers/static-assets/migration-guides/github-pages-to-workers/og.png?v=06cd7582399142d9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate from GitHub Pages to Workers

This guide walks you through migrating a static site or [Jekyll ↗︎](https://jekyllrb.com/) site from [GitHub Pages ↗︎](https://docs.github.com/en/pages) to Cloudflare Workers with [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) and [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/).

## 1. Prepare your repository

### Plain HTML or JavaScript static sites

Confirm your project's build command (if any) and static output directory (for example, `dist`, `public`, `build`, or `.` for pre-built HTML files).

### Jekyll sites hosted on GitHub Pages

GitHub Pages preinstalls a default set of Jekyll plugins even when no `Gemfile` is present. If your Jekyll repository does not already contain a `Gemfile` and `Gemfile.lock`, create them so Workers Builds can install your dependencies:

1. In your repository root, initialize a `Gemfile`:

   ```sh
   bundle init
   ```

2. Add the `github-pages` gem to your `Gemfile`:

   *Gemfileruby*



   ```ruby
   source "https://rubygems.org"

   gem "github-pages", group: :jekyll_plugins
   ```

3. Generate `Gemfile.lock` and commit both files:

   ```sh
   bundle update
   git add Gemfile Gemfile.lock
   git commit -m "Add Gemfile for Jekyll build"
   ```

## 2. Create a Wrangler configuration file

In the root of your repository, create a `wrangler.jsonc` file pointing `assets.directory` to your site's output folder (for example, `./_site` for Jekyll or `.` for plain HTML in the repository root):

```jsonc
{
	"name": "<your-project-name>",
	// Set this to today's date
	"compatibility_date": "2026-11-28",
	"assets": {
		"directory": "./_site"
	}
}
```

```toml
name = "<your-project-name>"
# Set this to today's date
compatibility_date = "2026-11-28"

[assets]
directory = "./_site"
```

If your site is a Single Page Application (SPA) rather than a static site, add `"not_found_handling": "single-page-application"` inside the `assets` object. If you have a custom `404.html` page, add `"not_found_handling": "404-page"`. Refer to [Static Assets routing](https://developers.cloudflare.com/workers/static-assets/routing/) for details.

Commit and push `wrangler.jsonc` to your GitHub repository.

## 3. Connect your repository to Workers Builds

1. Follow [Connect a new Worker](https://developers.cloudflare.com/workers/ci-cd/builds/#connect-a-new-worker) to connect your GitHub repository to Workers Builds.
2. Set the **Build command** for your site:
   - **Jekyll**: `bundle exec jekyll build`
   - **Plain HTML**: Leave blank
   - **Other static site generators**: Your framework build command (for example, `npm run build` or `hugo`)
3. Keep the default **Deploy command** ( `npx wrangler deploy`) and select **Save and Deploy**.

After the initial build completes, every push to your production branch deploys automatically, and pull requests receive [Preview URLs](https://developers.cloudflare.com/workers/previews/).

## 4. Migrate your custom domain

Workers [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) support domains whose DNS is managed by Cloudflare.

1. Verify your deployed site on its `*.workers.dev` subdomain.
2. In your GitHub repository settings under **Pages**, remove the custom domain so GitHub no longer serves it.
3. In the Cloudflare dashboard under **DNS** > **Records**, remove the `CNAME` or `A` records pointing to `<your-username>.github.io` or GitHub Pages IP addresses.
4. Follow [Add a Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/#add-a-custom-domain) to attach your domain to your Worker.

## Related resources

- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Configure custom headers](https://developers.cloudflare.com/workers/static-assets/headers/) and [redirects](https://developers.cloudflare.com/workers/static-assets/redirects/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/migration-guides/github-pages-to-workers/#page","headline":"Migrate from GitHub Pages to Workers","description":"Migrate a static site or Jekyll site from GitHub Pages to Cloudflare Workers with Static Assets.","url":"https://developers.cloudflare.com/workers/static-assets/migration-guides/github-pages-to-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/static-assets/migration-guides/github-pages-to-workers/og.png?v=06cd7582399142d9","dateModified":"2026-11-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Ruby"]}
```
