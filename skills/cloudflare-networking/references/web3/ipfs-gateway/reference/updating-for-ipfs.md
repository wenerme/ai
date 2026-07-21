---
description: Host your website on IPFS and serve it through Cloudflare.
title: Using IPFS with your website
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt
> Use this file to discover all available pages before exploring further.

#  Using IPFS with your website

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/web3/ipfs-gateway/reference/updating-for-ipfs/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Though it is not required, it is strongly recommended that websites hosted on IPFS use only relative links, unless linking to a different domain. This is because data can be accessed in many different (but ultimately equivalent) ways:

* From your custom domain: `https://ipfs.tech/index.html`
* From a gateway: `https://cloudflare-ipfs.com/ipns/ipfs.tech/index.html`
* By immutable hash: `https://cloudflare-ipfs.com/ipfs/QmNksJqvwHzNtAtYZVqFZFfdCVciY4ojTU2oFZQSFG9U7B/index.html`

Using only relative links within a web application supports all of these at once, and gives the most flexibility to the user. The exact method for switching to relative links, if you do not use them already, depends on the framework you use.

## Angular, React, Vue

These popular JavaScript frameworks are covered in a [blog post ↗](https://medium.com/pinata/how-to-easily-host-a-website-on-ipfs-9d842b5d6a01) from [Pinata ↗](https://pinata.cloud/). They are fixed with minor config changes.

## Gatsby

Gatsby is a JavaScript framework based on React. There is a [plugin ↗](https://www.gatsbyjs.org/packages/gatsby-plugin-ipfs/) for it that ensures links are relative.

## Jekyll

Add a file `_includes/base.html` with the contents:

```plaintext
{% assign base = '' %}
{% assign depth = page.url | split: '/' | size | minus: 1 %}
{% if    depth <= 1 %}{% assign base = '.' %}
{% elsif depth == 2 %}{% assign base = '..' %}
{% elsif depth == 3 %}{% assign base = '../..' %}
{% elsif depth == 4 %}{% assign base = '../../..' %}{% endif %}
```

This snippet computes the relative path back to the root of the website from the current page. Update any pages that need to link to the root by adding this at the top:

```plaintext
{%- include base.html -%}
```

This snippet also prefixing any links with `{{base}}`. So for example, we would change `href="https://developers.cloudflare.com/css/main.css"` to be `href="https://developers.cloudflare.com/web3/ipfs-gateway/reference/updating-for-ipfs/%7B%7Bbase%7D%7D/css/main.css"`

## Generic

For other frameworks, or if a framework was not used, there's a script called [make-relative ↗](https://github.com/tmcw/make-relative) that will parse the HTML of a website and automatically rewrite links and images to be relative.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web3/ipfs-gateway/reference/updating-for-ipfs/#page","headline":"Using IPFS with your website · Cloudflare Web3 docs","description":"Host your website on IPFS and serve it through Cloudflare.","url":"https://developers.cloudflare.com/web3/ipfs-gateway/reference/updating-for-ipfs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
