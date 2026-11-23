---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Use the Cloudflare CLI to send feedback from coding agents and see what diagnostic context the CLI includes in a report.
title: Agent feedback
image: https://developers.cloudflare.com/cf/agent-feedback/og.png?v=9202f423d3168164
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cf/llms.txt
> Use this file to discover all available pages before exploring further.

# Agent feedback

Use `cf feedback` to send bug reports, feature requests, and feedback about where you or your coding agent got stuck. Sign in with `cf auth login` or set `CLOUDFLARE_API_TOKEN` before running the command.

## Send a note

A short note is enough to submit feedback.

```sh
cf feedback "The deploy output did not identify the selected environment"
```

Add details with repeatable `--field key=value` flags.

```sh
cf feedback --field type=friction --field command="cf deploy" --field expected="Show the selected environment" --field actual="The output only showed the Worker name"
```

## Send an agent report

An agent can send a JSON report from a file or through standard input. Describe the task, the expected and actual results, and any workaround. Use the optional `agent` object for details such as the agent name or commands it ran.

*feedback.jsonjson*

```json
{
	"type": "friction",
	"task": "Find the command to list Worker deployments",
	"expected": "A search result for listing Worker deployments",
	"actual": "The first result was a command to create a deployment",
	"impact": "worked_around",
	"agent": {
		"name": "claude-code",
		"commands": ["cf cli search \"list Worker deployments\""]
	}
}
```

Send the file with `cf feedback --input-json feedback.json`. To read the JSON from standard input, set `--input-json=-`. If a `--field` flag and the JSON report supply the same field, the flag takes precedence. Run `cf feedback --help` for supported fields.

The command prints a JSON receipt with a `submission_id` after Cloudflare accepts the report. If you send feedback as an agent through the CLI or MCP tool, tell the user at the next natural break, such as the end of the current turn. Include the submission ID.

## Diagnostic context

Every feedback report includes diagnostic details such as the CLI version, operating system, and detected agent and model, regardless of your CLI telemetry settings. The complete JSON report, including diagnostic context, can be up to 16 KiB.

Feedback requests include the CLI version and execution mode in their headers, along with the agent name when detected. With `DO_NOT_TRACK` enabled, `cf feedback --help` reminds you that sending feedback includes diagnostic context.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cf/agent-feedback/#page","headline":"Agent feedback","description":"Use the Cloudflare CLI to send feedback from coding agents and see what diagnostic context the CLI includes in a report.","url":"https://developers.cloudflare.com/cf/agent-feedback/","inLanguage":"en","image":"https://developers.cloudflare.com/cf/agent-feedback/og.png?v=9202f423d3168164","dateModified":"2026-11-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
