---
title: C3 &#38; Wrangler
description: Before deploying your first Worker, learn about the CLI tools you will use to build and deploy your Worker project.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/workers/get-started/c3-and-wrangler.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# C3 & Wrangler

Before deploying your first Worker, learn about the CLI tools you will use to build and deploy your Worker project.

## Cloudflare dashboard

You can build and develop your Worker on the Cloudflare dashboard, without needing to install and use C3 and Wrangler. Continue to the next page to get started with Workers on the Cloudflare dashboard.

## CLI

The Cloudflare Developer Platform ecosystem has two command-line interfaces (CLI):

* C3: To create new projects.
* Wrangler: To build and deploy your projects.

## C3

[C3](https://developers.cloudflare.com/pages/get-started/c3/) (`create-cloudflare` CLI) is a command-line tool designed to help you set up and deploy new applications to Cloudflare. In addition to speed, it leverages officially developed templates for Workers and framework-specific setup guides to ensure each new application that you set up follows Cloudflare and any third-party best practices for deployment on the Cloudflare network.

You will use C3 for new project creation.

## Wrangler

[Wrangler](https://developers.cloudflare.com/workers/wrangler/) is a command-line tool for building with Cloudflare developer products.

With Wrangler, you can [develop](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) your Worker locally and remotely, [roll back](https://developers.cloudflare.com/workers/wrangler/commands/general/#rollback) to a previous deployment of your Worker, [delete](https://developers.cloudflare.com/workers/wrangler/commands/general/#delete) a Worker and its bound Developer Platform resources, and more. Refer to [Wrangler Commands](https://developers.cloudflare.com/workers/wrangler/commands/) to view the full reference of Wrangler commands.

When you run C3 to create your project, C3 will install the latest version of Wrangler and you do not need to install Wrangler again. You can [update Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/#update-wrangler) to a newer version in your project to access new Wrangler capabilities and features.

## Source of truth

If you are building your Worker on the Cloudflare dashboard, you will set up your project configuration (such as environment variables, bindings, and routes) through the dashboard. If you are building your project programmatically using C3 and Wrangler, you will rely on a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to configure your Worker.

Cloudflare recommends choosing and using one [source of truth](https://developers.cloudflare.com/workers/wrangler/configuration/#source-of-truth), the dashboard or the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), to avoid errors in your project.

## Summary

By reading this page, you have learned:

* How to use C3 to create new Workers and Pages projects.
* How to use Wrangler to develop, configure, and delete your projects.

In the next section, you will learn more about the Cloudflare dashboard before moving on to deploy your first Worker.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/workers/get-started/","name":"Deploy your first Worker"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/workers/get-started/c3-and-wrangler/","name":"C3 & Wrangler"}}]}
```
