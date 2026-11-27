---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Redirect requests for a section of your website, such as `/blog/`, to a subdomain while keeping the rest of the path and the query string.
title: Redirect a website section to a subdomain
image: https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-section-to-subdomain/og.png?v=9de73375df716a14
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect a website section to a subdomain

Redirect requests for a section of your website, such as `/blog/`, to a subdomain while keeping the rest of the path and the query string.

This example single redirect sends visitors from `www.example.com/blog/` to the subdomain `blog.example.com`. The redirect keeps the rest of the path and the query string.

Use this redirect when you move part of your website to a new hostname. For example, you might move a blog to [Cloudflare Pages](https://developers.cloudflare.com/pages/) on its own subdomain.

**When incoming requests match**

- **Wildcard pattern**
  - **Request URL**: `http*://www.example.com/blog/*`

**Then**

- **Target URL**: `https://blog.example.com/${2}`
- **Status code**: *301*
- **Preserve query string**: Enabled

In the request URL, the `*` in `http*` is `${1}`, and the second `*` captures everything after `/blog/`. Refer to [How wildcard references are numbered](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/#how-wildcard-references-are-numbered).

For example, the redirect rule would perform the following redirects:

| Request URL | Target URL | Status code |
| --- | --- | --- |
| `https://www.example.com/blog/2009/05/my-post.html` | `https://blog.example.com/2009/05/my-post.html` | `301` |
| `http://www.example.com/blog/` | `https://blog.example.com/` | `301` |
| `https://www.example.com/blog/archive?page=2` | `https://blog.example.com/archive?page=2` | `301` |
| `https://www.example.com/Blog/archive` | `https://blog.example.com/archive` | `301` |
| `https://www.example.com/blog` | (unchanged) | n/a |
| `https://www.example.com/about/` | (unchanged) | n/a |

Wildcard matching ignores upper and lower case, so the rule also redirects `/Blog/`. The rule does not redirect `https://www.example.com/blog`, because the request URL requires a slash after `/blog`. To redirect this URL, refer to [Redirect the section root without a trailing slash](#redirect-the-section-root-without-a-trailing-slash).

## Redirect the section root without a trailing slash

The request URL `http*://www.example.com/blog/*` does not match `/blog` without a trailing slash. A Page Rule with the URL `www.example.com/blog/*` does not match `/blog` either, so this second rule is optional.

To redirect `/blog`, create a second redirect rule. Use a custom filter expression so that the rule also matches requests with a query string, such as `/blog?page=2`:

**When incoming requests match**

- **Custom filter expression**

Using the Expression Builder:

- *Hostname* *equals* `www.example.com` **AND**
- *URI Path* *equals* `/blog`

If you are using the Expression Editor, enter the following expression:
`(http.host eq "www.example.com" and lower(http.request.uri.path) eq "/blog")`

**Then**

- **Type:** *Static*
- **URL:** `https://blog.example.com/`
- **Status code:** *301*
- **Preserve query string:** Enabled

The *equals* operator is case-sensitive, so the Expression Builder version does not match `/Blog`. The Expression Editor version uses the `lower()` function to also match `/Blog` and `/BLOG`.

For example, the second redirect rule would perform the following redirects:

| Request URL | Target URL | Status code |
| --- | --- | --- |
| `https://www.example.com/blog` | `https://blog.example.com/` | `301` |
| `https://www.example.com/blog?page=2` | `https://blog.example.com/?page=2` | `301` |
| `https://www.example.com/blogroll` | (unchanged) | n/a |

Do not use the wildcard pattern `http*://www.example.com/blog*` for this rule. It would also match unrelated paths, redirecting `/blogroll` to `https://blog.example.com/roll`, and it would redirect `/blog/post` to `https://blog.example.com//post`, with a double slash.

## Migrate from Page Rules

This redirect replaces a Page Rule with the following configuration:

- **URL**: `www.example.com/blog/*`
- **Setting**: *Forwarding URL*
- **Select Status code**: *301 - Permanent Redirect*
- **Destination URL**: `https://blog.example.com/$1`

This Page Rule URL does not include a URI scheme, so its first wildcard (`$1`) is the rest of the path after `/blog/`. In the redirect rule, the `*` in `http*` is the first wildcard (`${1}`), so the path is `${2}`.

For more information, refer to [Migrate Forwarding URL](https://developers.cloudflare.com/rules/reference/page-rules-migration/#migrate-forwarding-url).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-section-to-subdomain/#page","headline":"Redirect a website section to a subdomain","description":"Redirect requests for a section of your website, such as /blog/, to a subdomain while keeping the rest of the path and the query string.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-section-to-subdomain/","inLanguage":"en","image":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-section-to-subdomain/og.png?v=9de73375df716a14","dateModified":"2026-11-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
