---
description: Learn how to consume our changelog RSS feeds.
title: Consuming RSS Feeds
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Consuming RSS Feeds

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/new-features/consuming-rss-feeds/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Our [changelogs](https://developers.cloudflare.com/changelog/) are published to [various RSS feeds](https://developers.cloudflare.com/fundamentals/new-features/available-rss-feeds/) with HTML in the `<description>` tag.

In feeds with multiple products, such as the global or product-area feeds, the products associated with a given entry are in the `<category>` tag.

A single product will also appear in the custom `<product>` tag for legacy reasons, but we recommend you use the `<category>`

## Example XML

```xml
<rss version="2.0">
	<channel>
		<title>Cloudflare changelogs</title>
		<description>Updates to various Cloudflare products</description>
		<link>https://developers.cloudflare.com/changelog/</link>
		<item>
			<title>Agents, Workers, Workflows - Build AI Agents with Example Prompts</title>
			<link>https://developers.cloudflare.com/changelog/2025-02-14-example-ai-prompts/</link>
			<guid isPermaLink="true">https://developers.cloudflare.com/changelog/2025-02-14-example-ai-prompts/</guid>
			<description>
				<p>
					We've added an <a href="https://developers.cloudflare.com/workers/get-started/prompting/">example prompt</a> to help you get started with building AI agents and applications on Cloudflare ...
				</p>
			</description>
			<pubDate>Fri, 14 Feb 2025 19:00:00 GMT</pubDate>
			<product>Agents</product>
			<category>Agents</category>
			<category>Workers</category>
			<category>Workflows</category>
		</item>
	</channel>
</rss>
```

## Related resources

You can surface RSS feeds in several different providers, including:

* [Slack ↗](https://slack.com/help/articles/218688467-Add-RSS-feeds-to-Slack)
* [Microsoft Teams ↗](https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors)
* [Google Chat ↗](https://developers.google.com/workspace/chat/quickstart/webhooks)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/new-features/consuming-rss-feeds/#page","headline":"Consuming RSS Feeds · Cloudflare Fundamentals docs","description":"Learn how to consume our changelog RSS feeds.","url":"https://developers.cloudflare.com/fundamentals/new-features/consuming-rss-feeds/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
